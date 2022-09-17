import { Injectable } from '@angular/core';
import {
  Firestore,
  DocumentReference,
  doc,
  getDoc,
  docData,
} from '@angular/fire/firestore';
import {
  Auth,
  authState,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithCredential,
  getIdToken,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { UserDataService } from './user-data.service';
import { DataProvider } from '../providers/data.provider';
import { Router } from '@angular/router';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { setDoc, updateDoc } from 'firebase/firestore';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { httpsCallable, Functions } from '@angular/fire/functions';
import { signInWithRedirect } from 'firebase/auth';
import { UserData } from '../structures/user.structure';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userDoc: DocumentReference | undefined;
  checkerUserDoc: DocumentReference | undefined;
  allowedStatuses: string[] = ['active', 'inactive'];
  triggeredOnboarding: boolean = false;
  private loggedIn: boolean = false;
  get windowRef() {
    return window;
  }
  public authInstance:any;
  constructor(
    private auth: Auth,
    private analytics: Analytics,
    private userData: UserDataService,
    private alertify: AlertsAndNotificationsService,
    private firestore: Firestore,
    private router: Router,
    private platform: Platform,
    private dataProvider: DataProvider,
    private functions: Functions,
    private serverService:ServerService
  ) {
    this.authInstance = this.auth;
    if (auth) {
      // GoogleAuth.signIn();
      this.user = authState(this.auth);
      this.setDataObserver(this.user);
      this.userDisposable = authState(this.auth)
        .pipe(map((u) => !!u))
        .subscribe((isLoggedIn) => {
          this.loggedIn = isLoggedIn;
          this.dataProvider.loggedIn = isLoggedIn;
        });
    } else {
      this.loggedIn = false;
    }
  }
  public createNewUser = httpsCallable(this.functions, 'createUser');
  private userServerSubscription: Subscription | undefined = undefined;
  private userWalletSubscription: Subscription = Subscription.EMPTY;
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  // Read functions start
  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public get getUser(): Observable<User | null> {
    return this.user;
  }

  public async signInWithGoogle() {
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    if (this.platform.is('capacitor')) {
      GoogleAuth.signIn()
        .then((googleUser: any) => {
          const credential = GoogleAuthProvider.credential(
            googleUser.authentication.idToken,
            googleUser.authentication.accessToken
          );
          signInWithCredential(this.auth, credential)
            .then((credentials: UserCredential) => {
              getDoc(doc(this.firestore, 'users/' + credentials.user.uid))
                .then((userDocument: any) => {
                  if (!userDocument.exists()) {
                    this.userData.setUserData(credentials.user).then(() => {
                      this.router.navigate(['']);
                    });
                  } else {
                    this.dataProvider.pageSetting.blur = false;
                    this.alertify.presentToast(
                      'Logged In.',
                      'info',
                      5000,
                      [],
                      true,
                      ''
                    );
                    this.router.navigate(['']);
                  }
                })
                .catch((error) => {
                  this.dataProvider.pageSetting.blur = false;
                  this.alertify.presentToast(
                    error.message,
                    'error',
                    5000,
                    [],
                    true,
                    ''
                  );
                });
            })
            .catch((error) => {
              this.dataProvider.pageSetting.blur = false;
              this.alertify.presentToast(
                error.message,
                'error',
                5000,
                [],
                true,
                ''
              );
            });
        })
        .catch((error) => {
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast(
            error.message,
            'error',
            5000,
            [],
            true,
            ''
          );
        });
    } else {
      const googleAuthProvider = new GoogleAuthProvider();
      signInWithRedirect(this.auth, googleAuthProvider).then(
        (credentials: UserCredential) => {
          this.dataProvider.pageSetting.blur = true;
          getDoc(doc(this.firestore, 'users/' + credentials.user.uid))
            .then((userDocument: any) => {
              this.dataProvider.pageSetting.blur = true;
              if (!userDocument.exists()) {
                this.userData.setUserData(credentials.user).then(() => {
                  this.dataProvider.pageSetting.blur = false;
                  this.router.navigate(['']);
                });
              } else {
                this.dataProvider.pageSetting.blur = false;
                this.alertify.presentToast(
                  'Logged In.',
                  'info',
                  5000,
                  [],
                  true,
                  ''
                );
                this.router.navigate(['']);
              }
            })
            .catch((error) => {
              this.dataProvider.pageSetting.blur = false;
              this.alertify.presentToast(
                error.message,
                'error',
                5000,
                [],
                true,
                ''
              );
            });
        }
      );
    }
  }

  public async loginEmailPassword(email: string, password: string) {
    this.dataProvider.pageSetting.blur = true;
    let data = await signInWithEmailAndPassword(this.auth, email, password)
      .then((credentials: UserCredential) => {
        logEvent(this.analytics, 'Logged_In');
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.alertify.presentToast(error.message, 'error', 5000);
      })
      .finally(() => {
        this.dataProvider.pageSetting.blur = false;
      });
  }
  public signUpWithEmailAndPassword(
    email: string,
    password: string,
    username: string
  ) {
    console.log('Signing Up');
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (credentials: UserCredential) => {
        logEvent(this.analytics, 'Signed_Up');
        await this.userData.setUserData(credentials.user,username);
      })
      .catch((error) => {
        this.dataProvider.pageSetting.blur = false;
        if (error.code === 'auth/weak-password') {
          this.alertify.presentToast(
            'Password is weak.',
            'error',
            5000,
            [],
            true,
            ''
          );
        } else if (error.code === 'auth/email-already-in-use') {
          this.alertify.presentToast(
            'Email already in use.',
            'error',
            5000,
            [],
            true,
            ''
          );
        } else {
          this.alertify.presentToast(
            error.message,
            'error',
            5000,
            [],
            true,
            ''
          );
        }
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      });
  }
  // Sign in functions end
  // Sign out functions start
  public async logout() {
    if (confirm('Are you sure you want to logout?')) {
      await signOut(this.auth);
      logEvent(this.analytics, 'Logged_Out');
      this.router.navigate(['../login']);
    }
  }

  private async setDataObserver(user: Observable<User | null>) {
    // console.log('Starting data observer');
    this.dataProvider.gotUserData = false;
    if (user) {
      // console.log('Setting data observer');
      user.subscribe(async (u: User) => {
        // console.log('USer ', user);
        this.dataProvider.gotUserData = true;
        
        if (u) {
          this.dataProvider.userInstance = u;
          this.dataProvider.loggedIn = true;
          this.dataProvider.userID = u.uid;
          // alert(this.dataProvider.userID);
          // console.log('User is Logged In');
          this.userDoc = doc(this.firestore, 'users/' + u.uid);
          // console.log('User data from auth', u);
          if (this.userServerSubscription != undefined) {
            this.userServerSubscription.unsubscribe();
          }
          // this.logout();
          this.userWalletSubscription = docData(
            doc(this.firestore, 'users/' + u.uid + '/wallet/wallet')
          ).subscribe((walletData: any) => {
            this.dataProvider.wallet = walletData;
            // console.log('Wallet Data', walletData);
          });
          this.userServerSubscription = docData(this.userDoc).subscribe(
            async (data: UserData) => {
              this.dataProvider.userData = data;
              if(!this.triggeredOnboarding){
                // alert('Onboarding now')
                // this.serverService.onboardingForAepsKyc()
                this.triggeredOnboarding = true;
              }
              if (
                data.onboardingSteps.aadhaarDone == true &&
                data.onboardingSteps.locationDone == true &&
                data.onboardingSteps.panDone == true &&
                data.onboardingSteps.photosDone == true &&
                data.onboardingSteps.phoneDobDone == true &&
                data.kycStatus == 'incomplete'
              ) {
                updateDoc(this.userDoc, { kycStatus: 'pending' });
                this.serverService.onboardingForAepsKyc()
              }
              console.log('Received new data', data);
              if (data.status) {
                if (!this.allowedStatuses.includes(data.status.access)) {
                  alert(
                    'You (' +
                      data.userId +
                      ') have been ' +
                      data.status.access +
                      ' and will be signed out.'
                  );
                  this.logout();
                }
              } else {
                updateDoc(doc(this.firestore, 'users/' + u.uid), {
                  status: { access: 'active', isOnline: true },
                });
              }
              this.dataProvider.gettingUserData.next('completed');
              // this.setMissingFields();
            }
          );
        } else {
          this.router.navigate(['../login']);
          // console.log('User is Logged Out');
        }
      });
    } else {
      if (this.userServerSubscription != undefined) {
        this.userServerSubscription.unsubscribe();
      }
    }
  }
  setMissingFields() {
    if (!this.dataProvider.userData?.phoneNumber) {
      const res = prompt('Enter your phone number');
      if (res.length === 10) {
        setDoc(doc(this.firestore, 'users/' + this.dataProvider.userID), {
          phoneNumber: '+91' + res,
        });
      } else {
        this.alertify.presentToast('Invalid Phone Number', 'error', 5000);
      }
    }
  }

  public async loginWithPhone(phoneNumber: string,ref:RecaptchaVerifier) {
    return signInWithPhoneNumber(this.auth, phoneNumber, ref)
  }

  public getIdToken(user: User) {
    return getIdToken(user, true);
  }
  // createNewUser(newUser:any){
  //   return (newUser)
  // }
}
const geoFenceData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [82.04677820205688, 25.406187098992433],
            [82.04637050628662, 25.405552321150648],
            [82.04677820205688, 25.405341535403377],
            [82.04722344875334, 25.405956931840397],
            [82.04677820205688, 25.406187098992433],
          ],
        ],
      },
    },
  ],
};
