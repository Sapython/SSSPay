import { Component, NgZone, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { DatabaseService } from './services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import { registerPlugin } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { DataProvider } from './providers/data.provider';
import { AlertsAndNotificationsService } from './services/uiService/alerts-and-notifications.service';
import { NotificationService } from './services/notification.service';
import { App, URLOpenListenerEvent } from '@capacitor/app';

import {
  FirebaseDynamicLinks,
  LinkConfig,
} from '@pantrist/capacitor-firebase-dynamic-links';
import { ServerService } from './services/server.service';

export interface RdServicePlugin {
  getDeviceInfo(): Promise<{ value: string }>;
  getFingerPrint(): Promise<{ fingerprint: string }>;
}
const RdService = registerPlugin<RdServicePlugin>('RdService');
export default RdService;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  noHeaders = [
    'login',
    'phone-login',
    'register',
    'forgot-password',
    'reset-password',
    'verify-email',
    'splashscreen',
  ];
  showHeaders: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private platform: Platform,
    private databaseService: DatabaseService,
    private router: Router,
    public dataProvider: DataProvider,
    private alertify: AlertsAndNotificationsService,
    private notificationService: NotificationService,
    private zone: NgZone,
    private serverService:ServerService
  ) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceworker.js');
    }
    this.router.events.subscribe((val) => {
      this.showHeaders = !this.noHeaders.includes(
        window.location.pathname.replace('/', '')
      );
      // console.log("changed",this.showHeaders);
    });
    if (!this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        GoogleAuth.initialize({
          clientId:
            '1044964269542-uhumgrlgrfgr6mp2gc0gpctudta4eiad.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        });
      });
    } else if (this.platform.is('capacitor')) {
      // Contacts.getPermissions().then((permission:PermissionStatus)=>{
      //   alert(permission.granted)
      //   if(permission.granted){
      //     this.alertify.presentToast('Permission granted');
      //   }else{
      //     this.alertify.presentToast('Permission denied');
      //   }
      // })
    }
    // alert('Started getting user data')
    this.authService.user.subscribe((user) => {
      // alert('Got user data')
      if (user) {
        this.databaseService.getUser(user.uid).then((user) => {
          this.router.navigate(['homepage']);
          // if (user.data().messageToken == undefined){
          //   this.notificationService.startNotificationService();
          // }
          setTimeout(() => {
            this.serverService.getAepsKycStatus().then((data)=>{
              // alert("KYC Status"+data.toString());
              this.databaseService.addOnBoardingStatusData(data);
              if (data.response_code == 2 || data.status == 400){
                // alert("Starting KYC Status");
                this.serverService.onboardingForAepsKyc().then((data)=>{
                }).catch((error)=>{
                  console.log(error);
                  this.alertify.presentToast(JSON.stringify(error) || "When registering Onboarding for aeps kyc failed",'error')
                }).finally(()=>{
                  // alert("Onboarding for aeps kyc finally done")
                })
              } else if (data.response_code==0){
                this.alertify.presentToast("KYC is submitted and is in review.")
              }
            })
            if (this.dataProvider.userData){
              if (!dataProvider.userData.onboardingData){
                this.serverService.onboardingForAepsKyc().then((data)=>{
                }).catch((error)=>{
                  console.log("error KYC",error.message)
                  this.alertify.presentToast(error.message || "Onboarding for aeps kyc failed",'error')
                })
              }
            }
          },1000)
          this.notificationService.startNotificationService();
        });
      } else if (dataProvider.gotUserData) {
        if (environment.production) {
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['homepage']);
        }
      }
    });
  }
  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const slug = event.url.split('.app').pop();
        if (slug) {
          this.router.navigateByUrl(slug);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    });
  }
  async ngOnInit() {
    // if (this.platform.is('capacitor')) {
    //   alert('Starting timer for checker');
    //   setTimeout(async () => {
    //     alert('Started');
    //     const { value } = await RdService.getDeviceInfo();
    //     alert('Response from native:' + value);
    //     setTimeout(async ()=>{
    //       const { fingerprint } = await RdService.getFingerPrint();
    //       alert('Response from fingerprint:' + fingerprint);
    //     },5000)
    //   }, 5000);
    // }
  }
  createShortLink(): Promise<string> {
    const config: LinkConfig = {
      domainUriPrefix: 'https://ssspay.page.link',
      uri: 'https://ssspay.page.link/upiPaymentComplete',
    };
    return FirebaseDynamicLinks.createDynamicShortLink(config).then(
      (link) => link.value
    );
  }
  listenToDeepLinkOpen() {
    FirebaseDynamicLinks.addListener('deepLinkOpen', (data) => {
      console.log("deepLinkOpen",data);
    });
  }
}
