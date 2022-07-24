import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  uploadPanForm: FormGroup = new FormGroup({
    panNumber:new FormControl('',[Validators.required]),
    panImage:new FormControl('',[Validators.required]),
  })
  constructor(
    private alertService: AlertsAndNotificationsService,
    private loaderService: LoaderService,
    private databaseService: DatabaseService,
    private onboardingService: OnboardingService,
    private router: Router,
    private dataProvider:DataProvider,
  ) {}

  ngOnInit(): void {}

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
        const panImage = document.getElementById(
          'pan-image'
        ) as HTMLImageElement;
        panImage.src = URL.createObjectURL(file);
      } else {
        event.target.value = '';
      }
    }
  }

  submit(): void {
    console.log(this.uploadPanForm.value,this.input.nativeElement.files);
    if (this.input.nativeElement.files.length > 0) {
      this.loaderService.start('Uploading');
      const file = this.input.nativeElement.files[0];
      this.databaseService
        .upload('panImages/' + new Date().getTime() + '-' + this.dataProvider.userData?.userId, file)
        .then((url) => {
          this.loaderService.stop();
          if (typeof url === 'string' || url instanceof String) {
            this.onboardingService.details.aadhaarImageUrl = url;
            this.uploadPanForm.value['panImage'] = url;
            this.onboardingService.setPanDetails(this.uploadPanForm.value).then(() => {
              this.alertService.presentToast(
                'Pan details uploaded successfully.',
                'info'
              );
              this.router.navigate(['onboarding/phone-and-dob']);
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
