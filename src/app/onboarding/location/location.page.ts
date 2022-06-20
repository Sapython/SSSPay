import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Jharkhand',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  locationForm: FormGroup = new FormGroup({
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  constructor(
    private loaderService: LoaderService,
    private onboardingService: OnboardingService,
    private router: Router
  ) {}

  ngOnInit() {}

  submit() {
    if (this.locationForm.valid) {
      // this.loaderService.start();
      this.onboardingService.details.state =
        this.locationForm.get('state').value;
      this.onboardingService.details.city =
        this.locationForm.get('city').value;
      this.onboardingService.details.address =
        this.locationForm.get('address').value;
      this.onboardingService.details.pincode =
        this.locationForm.get('pincode').value;
      // this.loaderService.stop();
      this.router.navigate(['onboarding/aadhar']);
    }
  }
}
