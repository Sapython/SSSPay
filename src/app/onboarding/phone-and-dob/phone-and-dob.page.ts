import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-phone-and-dob',
  templateUrl: './phone-and-dob.page.html',
  styleUrls: ['./phone-and-dob.page.scss'],
})
export class PhoneAndDobPage implements OnInit {
  private loading;
  private presentLoading;
  
  constructor(
    private navCtrl: NavController,
    public loadingController: LoadingController
  ) { }
  credentials: FormGroup = new FormGroup({
    phonenumber: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
  }

  verifying() {
    if (this.credentials.valid) {
    this.loadingController
      .create({
        cssClass: 'my-custom-class',
        message: 'verifying...',
        duration: 2000,
      })
      .then((loading) => {
        loading.present();
        // loading.onDidDismiss().then(()=> console.log('Loading dismissed!'))
      });

    setTimeout(() => {
      // this.loading.dismiss;
      this.navCtrl.navigateRoot('onboarding/location');
    }, 2000);
  }
}

}
