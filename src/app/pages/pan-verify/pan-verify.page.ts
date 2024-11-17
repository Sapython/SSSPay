import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { LoadingController, NavController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';
@Component({
  selector: 'app-pan-verify',
  templateUrl: './pan-verify.page.html',
  styleUrls: ['./pan-verify.page.scss'],
})
export class PanVerifyPage implements OnInit {
  private loading;
  private presentLoading;

  panForm: UntypedFormGroup = new UntypedFormGroup({
    holderName: new UntypedFormControl('', [Validators.required]),
    panNumber: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private navCtrl: NavController,
    public loadingController: LoadingController
  ) {}

  // async presentLoadingWithOptions() {
  //   const loading = await this.loadingController.create({
  //     spinner: null,
  //     duration: 5000,
  //     message: 'Click the backdrop to dismiss early...',
  //     translucent: true,
  //     cssClass: 'custom-class custom-loading',
  //     backdropDismiss: true
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();
  //   console.log('Loading dismissed with role:', role);
  // }
  ngOnInit() {}
  verifying() {
    //  this.loadingController.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Please wait...',
    //   duration: 2000
    // }).then((overlay)=>{
    //   this.loading=overlay;
    //   this.loading=present;
    // })

    if (this.panForm.valid) {
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

      // setTimeout(() => {
      //   // this.loading.dismiss;
      //   this.navCtrl.navigateRoot('/pan-verified');
      // }, 2000);
    }
  }
}
