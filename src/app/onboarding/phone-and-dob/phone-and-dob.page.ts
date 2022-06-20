import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { OnboardingService } from 'src/app/services/onboarding.service';

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
    private router: Router
  ) {}

  ngOnInit() {}

  submit() {
    if (this.phoneAndDobForm.valid) {
      // this.loaderService.start();
      this.onboardingService.details.mobileNumber =
        this.phoneAndDobForm.get('mobileNumber').value;
      this.onboardingService.details.dob =
        this.phoneAndDobForm.get('dob').value;
      // this.loaderService.stop();
      this.router.navigate(['onboarding/location']);
    }
  }
}
