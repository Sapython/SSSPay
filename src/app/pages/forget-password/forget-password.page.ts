import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPageComponent } from '../uiwidgets/modal-page/modal-page.component';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  emailValue;
  constructor(  
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

 
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class'
      

    });
    return await modal.present();
  }

}
