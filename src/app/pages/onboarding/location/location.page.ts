import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

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

  locationForm: UntypedFormGroup = new UntypedFormGroup({
    state: new UntypedFormControl('', [Validators.required]),
    city: new UntypedFormControl('', [Validators.required]),
    address: new UntypedFormControl('', [Validators.required]),
    pincode: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  constructor(
    private loaderService: LoaderService,
    private onboardingService: OnboardingService,
    private router: Router,
    private alertService:AlertsAndNotificationsService
  ) {}

  ngOnInit() {}

  submit() {
    if (this.locationForm.valid) {
      this.loaderService.start();
      this.onboardingService.setLocationDetails(this.locationForm.value).then(() => {
        this.alertService.presentToast(
          'Phone and DOB added successfully.',
          'info'
        );
        this.router.navigate(['onboarding/verification-request-sent']);
      }).catch(() => {
        this.alertService.presentToast('Something went wrong. Please try again.');
      }).finally(()=>{
        this.loaderService.stop();
      });
      this.loaderService.stop();
    }
  }
}
