import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-phone-and-dob',
  templateUrl: './phone-and-dob.page.html',
  styleUrls: ['./phone-and-dob.page.scss'],
})
export class PhoneAndDobPage implements OnInit {
  phoneAndDobForm: FormGroup = new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    dob: new FormControl('', [Validators.required]),
  });

  constructor(
    private loaderService: LoaderService,
    private onboardingService: OnboardingService,
    private router: Router,
    private alertService:AlertsAndNotificationsService
  ) {}

  ngOnInit() {}

  submit(): void {
    this.loaderService.start('Setting up...');
    this.onboardingService.setPhoneAndDobDetails(this.phoneAndDobForm.value.mobileNumber,this.phoneAndDobForm.value.dob).then(() => {
      this.alertService.presentToast(
        'Phone and DOB added successfully.',
        'info'
      );
      this.router.navigate(['onboarding/location']);
    }).catch(() => {
      this.alertService.presentToast('Something went wrong. Please try again.');
    }).finally(()=>{
      this.loaderService.stop();
    });
  }
}
