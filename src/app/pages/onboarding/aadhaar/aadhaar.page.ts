import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-aadhaar',
  templateUrl: './aadhaar.page.html',
  styleUrls: ['./aadhaar.page.scss'],
})
export class AadhaarPage implements OnInit {
  @ViewChild('aadhaarImage') aadhaarImage;
  @ViewChild('front') front;
  @ViewChild('back') back;
  frontImageCompressed: File;
  backImageCompressed: File;
  uploadAadhaarForm: UntypedFormGroup = new UntypedFormGroup({
    aadhaarNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{12}'),
    ]),
    fullName: new UntypedFormControl('', [Validators.required]),
    aadhaarFrontImage: new UntypedFormControl('', [Validators.required]),
    aadhaarBackImage: new UntypedFormControl('', [Validators.required]),
  });
  constructor(
    private alertService: AlertsAndNotificationsService,
    private loaderService: LoaderService,
    private databaseService: DatabaseService,
    private onboardingService: OnboardingService,
    private dataProvider: DataProvider,
    private router: Router,
    private compressService:NgxImageCompressService
  ) {}

  ngOnInit(): void {
    console.log(this.uploadAadhaarForm);
  }

  imageIsValid(file: File): boolean {
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    const MAX_SIZE = 10_000_000;
    const MAX_SIZE_STR = '1MB';

    if (!validExtensions.includes(file.type)) {
      this.alertService.presentToast('Select a .jpeg or .png file only.');
      return false;
    }
    if (file.size > MAX_SIZE) {
      this.alertService.presentToast(
        'Your file must be less than or equal to ' + MAX_SIZE_STR
      );
      file = null;
      return false;
    }
    return true;
  }

  urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
  }

  async selectImage(event: Event, type: 'front' | 'back'): Promise<void> {
    if (
      event.target &&
      event.target instanceof HTMLInputElement &&
      event.target.files &&
      event.target.files.length > 0
    ) {
      const unCompresssedFile = event.target.files[0];
      console.log("previous file",unCompresssedFile.size/1024/1024);
      let compressedData = await this.compressService.compressFile((window.URL.createObjectURL(unCompresssedFile)),1,50, 50,1000,1000);
      let imageType = compressedData.split(';')[0].split('/')[1];
      let file = await this.urltoFile(compressedData,'aadhaarTemp-'+unCompresssedFile.name, 'image/'+imageType)
      console.log("compressed file",file,file.size/1024/1024);
      if (this.imageIsValid(file)) {
        if (type === 'front') {
          var aadhaarImage = document.getElementById(
            'aadhaar-image-front'
          ) as HTMLImageElement;
          this.frontImageCompressed = file;
        } else {
          var aadhaarImage = document.getElementById(
            'aadhaar-image-back'
          ) as HTMLImageElement;
          this.backImageCompressed = file;
        }
        aadhaarImage.src = URL.createObjectURL(file);
      } else {
        event.target.value = '';
      }
    }
  }

  async submit(): Promise<void> {
    console.log(this.uploadAadhaarForm.value, this.back.nativeElement.files);
    if (
      this.frontImageCompressed ||
      this.backImageCompressed
    ) {
      this.loaderService.start('Uploading');
      const frontFile = this.frontImageCompressed;
      const backFile = this.backImageCompressed;
      try {
        console.log("frontFile.size",frontFile.size/1024/1024);
        var frontImageUrl = await this.databaseService.upload(
          'aadhaarImages/' +
            new Date().getTime() +
            'front-' +
            this.dataProvider.userData?.userId,
          frontFile
        );
        console.log("backFile.size",backFile.size/1024/1024);
        var backImageUrl = await this.databaseService.upload(
          'aadhaarImages/' +
            new Date().getTime() +
            'back-' +
            this.dataProvider.userData?.userId,
          backFile
        );
        this.onboardingService.details.aadhaarFrontImageUrl = frontImageUrl;
        this.onboardingService.details.aadhaarBackImageUrl = backImageUrl;
        this.uploadAadhaarForm.value['aadhaarFrontImageUrl'] = frontImageUrl;
        this.uploadAadhaarForm.value['aadhaarBackImageUrl'] = backImageUrl;
        await this.onboardingService.setAadhaarDetails(this.uploadAadhaarForm.value)
          this.alertService.presentToast(
            'aadhaar uploaded successfully.',
            'info'
          );
          this.router.navigate(['onboarding/pan']);
      } catch (error) {
        console.log(error);
        this.alertService.presentToast(
          'Something went wrong. Please try again.'
        );
      } finally {
        this.loaderService.stop();
      };
    } else {
      this.loaderService.stop();
      this.alertService.presentToast('Please select one image.');
    }
  }
}
