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

  constructor(private fs: Firestore, private dataProvider: DataProvider) {
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
  async setAadhaarDetails(aadhaarData: any) {
    try {
      const data = await setDoc(
        doc(this.fs, `users/${this.dataProvider.userData.userId}/aadhaar/data`),
        aadhaarData,
        { merge: true }
      );
      await updateDoc(
        doc(this.fs, `users/${this.dataProvider.userData.userId}`),
        { onboardingSteps: { aadhaarDone: true } }
      );
      return data;
    } catch (error) {
      return error;
    }
  }
  async setPanDetails(panData: any) {
    try {
      const data = await setDoc(
        doc(this.fs, `users/${this.dataProvider.userData.userId}/pan/data`),
        panData,
        { merge: true }
      );
      await updateDoc(
        doc(this.fs, `users/${this.dataProvider.userData.userId}`),
        {
          onboardingSteps: {
            panDone: true,
            aadhaarDone: this.dataProvider.userData.onboardingSteps.aadhaarDone,
          },
        }
      );
      return data;
    } catch (error) {
      return error;
    }
  }
  setPhoneAndDobDetails(phone: number, dob: string) {
    return setDoc(
      doc(this.fs, `users/${this.dataProvider.userData.userId}`),
      {
        phoneNumber: phone,
        dob: dob,
        onboardingSteps: {
          phoneDobDone: true,
          aadhaarDone: this.dataProvider.userData.onboardingSteps.aadhaarDone,
          panDone: this.dataProvider.userData.onboardingSteps.panDone,
        },
      },
      { merge: true }
    );
  }
  setLocationDetails(locationData: any) {
    return setDoc(
      doc(this.fs, `users/${this.dataProvider.userData.userId}`),
      {
        ...locationData,
        onboardingSteps: {
          locationDone: true,
          phoneDobDone: this.dataProvider.userData.onboardingSteps.phoneDobDone,
          aadhaarDone: this.dataProvider.userData.onboardingSteps.aadhaarDone,
          panDone: this.dataProvider.userData.onboardingSteps.panDone,
        },
      },
      { merge: true }
    );
  }
}
