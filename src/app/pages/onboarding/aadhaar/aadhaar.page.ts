import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-aadhaar',
  templateUrl: './aadhaar.page.html',
  styleUrls: ['./aadhaar.page.scss'],
})
export class AadhaarPage implements OnInit {
  @ViewChild('aadhaarImage') aadhaarImage;
  @ViewChild('input') input;
  uploadAadhaarForm: FormGroup = new FormGroup({
    aadhaarNumber:new FormControl('',[Validators.required]),
    fullName:new FormControl('',[Validators.required]),
    aadhaarImage:new FormControl('',[Validators.required]),
  })
  constructor(
    private alertService: AlertsAndNotificationsService,
    private loaderService: LoaderService,
    private databaseService: DatabaseService,
    private onboardingService: OnboardingService,
    private dataProvider:DataProvider,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.uploadAadhaarForm);
  }

  imageIsValid(file: File): boolean {
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    const MAX_SIZE = 1_000_000;
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

  selectImage(event: Event): void {
    if (
      event.target &&
      event.target instanceof HTMLInputElement &&
      event.target.files &&
      event.target.files.length > 0
    ) {
      const file = event.target.files[0];
      if (this.imageIsValid(file)) {
        const aadhaarImage = document.getElementById(
          'aadhaar-image'
        ) as HTMLImageElement;
        aadhaarImage.src = URL.createObjectURL(file);
      } else {
        event.target.value = '';
      }
    }
  }

  submit(): void {
    console.log(this.uploadAadhaarForm.value,this.input.nativeElement.files);
    if (this.input.nativeElement.files.length > 0) {
      this.loaderService.start('Uploading');
      const file = this.input.nativeElement.files[0];
      this.databaseService
        .upload('aadhaarImages/' + new Date().getTime() + '-' + this.dataProvider.userData?.userId, file)
        .then((url) => {
          this.loaderService.stop();
          if (typeof url === 'string' || url instanceof String) {
            this.onboardingService.details.aadhaarImageUrl = url;
            this.uploadAadhaarForm.value['aadhaarImage'] = url;
            this.onboardingService.setAadhaarDetails(this.uploadAadhaarForm.value).then(() => {
              this.alertService.presentToast(
                'aadhaar uploaded successfully.',
                'info'
              );
              this.router.navigate(['onboarding/pan']);
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
