import { Injectable } from '@angular/core';

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
    aadharImageUrl: any;
    panImageUrl: any;
  };

  constructor() {
    this.details = {
      mobileNumber: '',
      dob: '',
      state: '',
      city: '',
      address: '',
      pincode: '',
      aadharImageUrl: '',
      panImageUrl: '',
    };
  }
}
