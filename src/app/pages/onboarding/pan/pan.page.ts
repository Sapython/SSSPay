import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-pan',
  templateUrl: './pan.page.html',
  styleUrls: ['./pan.page.scss'],
})
export class PanPage implements OnInit {
  @ViewChild('panImage') panImage;
  @ViewChild('input') input;
  uploadPanForm: UntypedFormGroup = new UntypedFormGroup({
    panNumber:new UntypedFormControl('',[Validators.required,Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]),
    panImage:new UntypedFormControl('',[Validators.required]),
  })
  panCompressedFile:File;
  constructor(
    private alertService: AlertsAndNotificationsService,
    private loaderService: LoaderService,
    private databaseService: DatabaseService,
    private onboardingService: OnboardingService,
    private router: Router,
    private compressService:NgxImageCompressService,
    private dataProvider:DataProvider,
  ) {}

  ngOnInit(): void {}

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

  async selectImage(event: Event): Promise<void> {
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
      if (this.imageIsValid(file)) {
        const panImage = document.getElementById(
          'pan-image'
        ) as HTMLImageElement;
        panImage.src = URL.createObjectURL(file);
        this.panCompressedFile = file;
      } else {
        event.target.value = '';
      }
    }
  }

  submit(): void {
    console.log(this.uploadPanForm.value,this.input.nativeElement.files);
    if (this.panCompressedFile) {
      this.loaderService.start('Uploading');
      const file = this.panCompressedFile;
      this.databaseService
        .upload('panImages/' + new Date().getTime() + '-' + this.dataProvider.userData?.userId, file)
        .then((url) => {
          this.loaderService.stop();
          if (typeof url === 'string' || url instanceof String) {
            this.onboardingService.details.panImageUrl = url;
            this.uploadPanForm.value['panImage'] = url;
            this.onboardingService.setPanDetails(this.uploadPanForm.value).then(() => {
              this.alertService.presentToast(
                'Pan details uploaded successfully.',
                'info'
              );
              this.router.navigate(['onboarding/verification-request-sent']);
            }).catch(() => {
              this.alertService.presentToast('Something went wrong. Please try again.');
            }).finally(()=>{
              this.loaderService.stop();
            });
          } else {
            this.loaderService.stop();
            this.alertService.presentToast(url, 'error');
          }
        });
    } else {
      this.loaderService.stop();
      this.alertService.presentToast('Please select aadhaar image.');
    }
  }
}
