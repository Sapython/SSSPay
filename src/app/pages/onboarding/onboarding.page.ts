import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  constructor(private router:Router,private dataProvider:DataProvider,private alertify:AlertsAndNotificationsService) { }
  ionViewWillEnter(){
    this.ngOnInit();
  }
  ngOnInit() {
    if (!this.dataProvider.userData.onboardingSteps.aadhaarDone){
      this.router.navigate(['./onboarding/aadhaar']);
      this.alertify.presentToast('Please complete your Aadhaar onboarding process');
    } else if (!this.dataProvider.userData.onboardingSteps.panDone){
      this.router.navigate(['./onboarding/pan']);
      this.alertify.presentToast('Please complete your PAN onboarding process');
    } else if (!this.dataProvider.userData.onboardingSteps.phoneDobDone){
      this.router.navigate(['./onboarding/phone-and-dob']);
      this.alertify.presentToast('Please complete your Phone & DOB onboarding process');
    } else if (!this.dataProvider.userData.onboardingSteps.locationDone){
      this.router.navigate(['./onboarding/location']);
      this.alertify.presentToast('Please complete your location onboarding process');
    } else if (!this.dataProvider.userData.onboardingSteps.photosDone) {
      this.router.navigate(['./onboarding/photo']);
      this.alertify.presentToast('Your KYC request is not complete. Please add images to proceed.');
    } else if (this.dataProvider.userData.kycStatus==='pending') {
      this.router.navigate(['./onboarding/verification-request-sent']);
      this.alertify.presentToast('Your KYC request is pending. Please wait for the admin to approve it.');
    } else if (this.dataProvider.userData.kycStatus==='approved') {
      return true;
    } else if (this.dataProvider.userData.kycStatus==='rejected') {
      this.router.navigate(['./onboarding/rejected']);
      this.alertify.presentToast('Your KYC request has been rejected. Please contact the admin.');
    } else {
      this.alertify.presentToast('Something went wrong. Please try again later.'+this.dataProvider.userData.kycStatus,);
      return false;
    }
  }

}
