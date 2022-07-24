import { Injectable } from '@angular/core';
import { User, UserCredential } from '@angular/fire/auth';
import { Firestore, addDoc, collectionData,DocumentReference, CollectionReference , collection , setDoc, doc, updateDoc, deleteDoc, docSnapshots, docData, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { DataProvider } from '../providers/data.provider';
import { ExtraLoginEmailInfo, ExtraLoginGoogleInfo } from '../structures/method.structure';
import { bloodGroup, department, designation, UserAccess, UserData } from '../structures/user.structure';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  usersDoc:CollectionReference;
  userDoc:DocumentReference| undefined;
  constructor(private firestore: Firestore,private router:Router ,private alertify:AlertsAndNotificationsService, private dataProvider:DataProvider) {
    this.usersDoc = collection(this.firestore,'users');
  }

  public async setUserData(user:User){
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data:UserData = {
      userId: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || this.getRandomImage(),
        phoneNumber: '',
        dob: new Date(),
        access: {
          access: 'guest',
        },
        status: { access: 'active', isOnline: true },
        aadhaarNumber: '',
        gender:'not-specified',
        address:'',
        emailVerified:false,
        tutorialCompleted:false,
        city:'',
        nickName:'',
        pincode:'',
        state:'',
        panCardNumber:'',
        onboardingDone:false,
        kycStatus:'pending',
        onboardingSteps: {
          phoneDobDone: false,
          panDone: false,
          locationDone: false,
          aadhaarDone: false,
        }
    }
    this.userDoc  = doc(this.firestore,'users/'+user.uid);
    await setDoc(this.userDoc,data).then(()=>{
      this.alertify.presentToast('User data set successfully')
    });
    this.dataProvider.pageSetting.blur = false;
  }

  getRandomImage():string{
    return "https://firebasestorage.googleapis.com/v0/b/sit-manager.appspot.com/o/users%2Fdefault%2Fuser.png?alt=media&token=f7502ba7-275f-40a8-92bd-7df725bc7786";
  }
}
