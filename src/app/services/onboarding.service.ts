import { Injectable } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { setDoc, updateDoc } from '@firebase/firestore';
import { DataProvider } from '../providers/data.provider';
import { registerPlugin } from '@capacitor/core';

export interface OnboardingType {
  startOnboarding(options: {
    merchantCode: string;
    phone: string;
    email: string;
  }): Promise<{ value: string }>;
}
const Onboarding = registerPlugin<OnboardingType>('Onboarding');
export default Onboarding;

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

  onboardPaysprint() {
    console.log('onboardPaysprint getting position',this.dataProvider.userData.phoneNumber);
    alert('onboardPaysprint getting position'+JSON.stringify({
      merchantCode: this.dataProvider.userData.userId,
      phone: this.dataProvider.userData.phoneNumber,
      email: this.dataProvider.userData.email,
    }));
    Onboarding.startOnboarding({
      merchantCode: this.dataProvider.userData.userId,
      phone: this.dataProvider.userData.phoneNumber.toString(),
      email: this.dataProvider.userData.email,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong' + JSON.stringify(err));
      });
    // Geolocation.checkPermissions().then((res)=>{
    //   if(res.location=='granted'){
    //     Geolocation.getCurrentPosition({enableHighAccuracy:true}).then((position)=>{
    //       console.log('onboardPaysprint got position');
    //       if (position.coords.latitude == 0 && position.coords.longitude == 0) {
    //         alert('Please enable location services');
    //         return;
    //       }
    //       if (!this.dataProvider.userData.userId) {
    //         alert('Please login to continue');
    //         return
    //       }
    //       if (!this.dataProvider.userData.phoneNumber) {
    //         alert('No phone number found');
    //         return
    //       }
    //       if (!this.dataProvider.userData.email) {
    //         alert('No email found');
    //         return
    //       }

    //       console.log(position);
    //
    //   }
    // })

    // window.navigator.geolocation.getCurrentPosition((position)=>{

    // },(err)=>{
    //   console.log(err);
    //   alert('Something went wrong'+JSON.stringify(err))
    // })
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
  setPhoneAndDobDetails(phone: number, dob: Date) {
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

  photoDone(selfieImage: string, shopImage: string) {
    return updateDoc(doc(this.fs, '/users/' + this.dataProvider.userID), {
      selfieImage: selfieImage,
      shopImage: shopImage,
      onboardingSteps: {
        ...this.dataProvider.userData.onboardingSteps,
        photosDone: true,
      },
    });
  }
}
