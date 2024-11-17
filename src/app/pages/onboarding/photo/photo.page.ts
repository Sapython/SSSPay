import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  constructor(
    private databaseService: DatabaseService,
    private dataProvider: DataProvider,
    private onboardingService:OnboardingService,
    private alertify: AlertsAndNotificationsService,
    private router:Router,
    private compressService:NgxImageCompressService

  ) {}
  selfieImage: string;
  selfieFormat: string;
  shopImage: string;
  shopFormat: string;
  valid: boolean = false;
  ngOnInit() {}
  finalize() {
    console.log('finalize', this.selfieImage, this.shopImage);
    if (this.selfieImage && this.shopImage) {
      this.valid = true;
      alert("valid")
    }
  }
  async takeSelfie() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    this.selfieFormat = image.format;
    // this.selfieImage = image.base64String;
    // convert base64 to data url

    let dataUrl = 'data:image/' + image.format + ';base64,' + image.base64String;
    console.log('image', image);
    let compressedData = await this.compressService.compressFile(dataUrl,1,50, 50,1000,1000);
    let imageType = compressedData.split(';')[0].split('/')[1];
    this.selfieImage = compressedData.split(',')[1];
    this.finalize();
  }
  b64toBlob(b64Data, contentType: any, sliceSize: number) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  async takeShopPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    this.shopFormat = image.format;
    // this.shopImage = image.base64String;
    let dataUrl = 'data:image/' + image.format + ';base64,' + image.base64String;
    let compressedData = await this.compressService.compressFile(dataUrl,1,50, 50,1000,1000);
    let imageType = compressedData.split(';')[0].split('/')[1];
    this.shopImage = compressedData.split(',')[1];
    this.finalize();
  }

  async upload() {
    this.dataProvider.pageSetting.blur = true;
    const selfieImage = this.b64toBlob(
      this.selfieImage,
      'image/' + this.selfieFormat,
      512
    );
    const shopImage = this.b64toBlob(
      this.shopImage,
      'image/' + this.shopFormat,
      512
    );
    const selfieUrl = await this.databaseService.upload(
      'kycVerifications/' +
        this.dataProvider.userData.userId +
        '/selfie/' +
        this.dataProvider.userData.userId +
        'selfie.png',
      selfieImage
    );
    const shopUrl = await this.databaseService.upload(
      'kycVerifications/' +
        this.dataProvider.userData.userId +
        '/selfie/' +
        this.dataProvider.userData.userId +
        'shop.png',
      shopImage
    );
    console.log('selfieUrl', selfieUrl);
    console.log('shopUrl', shopUrl);
    this.onboardingService
      .photoDone(selfieUrl, shopUrl)
      .then((data) => {
        this.alertify.presentToast('Photo uploaded successfully');
        this.router.navigate(['../../homepage']);
      })
      .catch((err) => {
        this.alertify.presentToast('Photo upload failed');
      })
      .finally(() => {
        this.dataProvider.pageSetting.blur = false;
      });
  }
}
