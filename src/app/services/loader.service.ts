import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(public loadingController: LoadingController) {}

  start(message: string = 'Loading') {
    this.loadingController
      .create({
        message: message,
      })
      .then((response) => {
        response.present();
      });
  }

  stop() {
    this.loadingController.dismiss();
  }
}
