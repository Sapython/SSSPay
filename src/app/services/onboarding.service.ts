import { Injectable } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { setDoc, updateDoc } from '@firebase/firestore';
import { DataProvider } from '../providers/data.provider';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  details: {
    mobileNumber: string;
    dob: string;
    state: string;
    city: string;
    address: string;
    pincode: string;
    aadhaarImageUrl: any;
    panImageUrl: any;
  };

  constructor(private fs:Firestore,private dataProvider:DataProvider) {
    this.details = {
      mobileNumber: '',
      dob: '',
      state: '',
      city: '',
      address: '',
      pincode: '',
      aadhaarImageUrl: '',
      panImageUrl: '',
    };
  }
  setAadhaarDetails(aadhaarData:any){
    return setDoc(doc(this.fs,`users/${this.dataProvider.userData.userId}/aadhaar/data`),aadhaarData,{merge:true})
  }
  setPanDetails(panData:any){
    return setDoc(doc(this.fs,`users/${this.dataProvider.userData.userId}/pan/data`),panData,{merge:true})
  }
  setPhoneAndDobDetails(phone:number,dob:string){
    return updateDoc(doc(this.fs,`users/${this.dataProvider.userData.userId}`),{phoneNumber:phone,dob:dob})
  }
  setLocationDetails(locationData:any){
    return updateDoc(doc(this.fs,`users/${this.dataProvider.userData.userId}`),locationData)
  }
}
