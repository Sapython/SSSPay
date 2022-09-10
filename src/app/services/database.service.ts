import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  setDoc,
  increment,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { DataProvider } from '../providers/data.provider';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { UserData } from '../structures/user.structure';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private fs: Firestore,
    private dataProvider: DataProvider,
    private analytics: Analytics
  ) {}

  storage = getStorage();

  logBug(description) {
    logEvent(this.analytics, 'bug', { description: description });
    let date = new Date().toDateString();
    let data = {
      date: date || '',
      message: description || '',
      url: window.location.href || '',
      clientInfo: window.navigator.userAgent || '',
      user: this.dataProvider.userData || '',
      logs: this.dataProvider.logs || '',
      screenWidth: screen.width || '',
      screenHeight: screen.height || '',
      windowWidth: window.innerWidth || '',
      windowHeight: window.innerHeight || '',
      availWidth: screen.availWidth || '',
      availHeight: screen.availHeight || '',
      colorDepth: screen.colorDepth || '',
      pixelDepth: screen.pixelDepth || '',
      referrer: document.referrer || '',
      historyLength: history.length || '',
      title: document.title || '',
      browserName: window.navigator.userAgent || '',
      userLanguage: navigator.language || '',
      userAgent: navigator.userAgent || '',
      cookieEnabled: navigator.cookieEnabled || '',
      onLine: navigator.onLine || '',
      hardwareConcurrency: navigator.hardwareConcurrency || '',
      maxTouchPoints: navigator.maxTouchPoints || '',
      doNotTrack: navigator.doNotTrack || '',
      solved: false,
    };
    return addDoc(collection(this.fs, 'logs'), data);
  }

  // Files services starts

  async upload(
    path: string,
    file: File | ArrayBuffer | Blob | Uint8Array
  ): Promise<any> {
    // const ext = file!.name.split('.').pop();
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (e: any) {
        console.error(e);
        return e;
      }
    } else {
      // handle invalid file
      return false;
    }
  }

  // user actions
  getUser(userId: string) {
    return getDoc(doc(this.fs, 'users/' + userId));
  }

  // Files services ends

  // AEPS services starts

  getBanks() {
    return getDocs(
      query(collection(this.fs, '/banks'), orderBy('name', 'asc'))
    );
  }

  getOperators() {
    return getDocs(
      query(collection(this.fs, '/mobileOperators'), orderBy('name', 'asc'))
    );
  }
  // AEPS services ends

  // DTH services starts

  getDTHPayments() {
    console.log('EX123', this.dataProvider.userID);
    return getDocs(
      query(
        collection(
          this.fs,
          'users/' + this.dataProvider.userID + '/dth-recharges'
        ),
        orderBy('timestamp', 'desc')
      )
    );
  }

  // DTH services ends

  resetVerification() {
    return updateDoc(doc(this.fs, 'users/' + this.dataProvider.userID), {
      onboardingSteps: {
        phoneDobDone: false,
        panDone: false,
        locationDone: false,
        aadhaarDone: false,
      },
      kycStatus: 'pending',
    });
  }

  setAsPrimaryAccount(data) {
    return updateDoc(doc(this.fs, '/users/' + this.dataProvider.userID), {
      primaryPayoutAccount: data,
      payoutDetailsCompleted:
        this.dataProvider.userData.payoutFundAccount?.length > 0 ? true : false,
    });
  }

  addFundAccount(data) {
    return updateDoc(doc(this.fs, '/users/' + this.dataProvider.userID), {
      payoutFundAccount: arrayUnion(data),
      payoutDetailsCompleted: true,
    });
  }

  removeFundAccount(data) {
    return updateDoc(doc(this.fs, '/users/' + this.dataProvider.userID), {
      payoutFundAccount: arrayRemove(data),
      payoutDetailsCompleted:
        this.dataProvider.userData.payoutFundAccount?.length > 0 ? true : false,
    });
  }

  updateUserData(userdata: any) {
    return updateDoc(
      doc(this.fs, '/users/' + this.dataProvider.userID),
      userdata
    );
  }

  getNotifications() {
    return getDocs(
      query(
        collection(
          this.fs,
          'users/' + this.dataProvider.userData.userId + '/notifications'
        ),
        orderBy('time', 'desc')
      )
    );
  }

  deleteNotification(id) {
    return deleteDoc(
      doc(
        this.fs,
        'users/' + this.dataProvider.userData.userId + '/notifications/' + id
      )
    );
  }

  createWallet() {
    return setDoc(
      doc(
        this.fs,
        'users/' + this.dataProvider.userData.userId + '/wallet/wallet'
      ),
      {
        balance: 0,
      }
    );
  }

  addTestMoney() {
    return updateDoc(
      doc(
        this.fs,
        '/users/' + this.dataProvider.userData.userId + '/wallet/wallet'
      ),
      {
        balance: increment(5000),
      }
    );
  }

  getLog() {
    return getDoc(doc(this.fs, '/logs/qwJbZ7EheiaEp23cDY3l'));
  }

  addOnboardingData(data){
    return updateDoc(doc(this.fs, '/users/' + this.dataProvider.userID), {
      onboardingData: data,
    });
  }

  addOnBoardingStatusData(data){
    return updateDoc(doc(this.fs, '/users/' + this.dataProvider.userID), {
      onboardingStatusData: data,
    });
  }
}
