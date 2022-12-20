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

@Component({
  selector: 'app-aadhaar',
  templateUrl: './aadhaar.page.html',
  styleUrls: ['./aadhaar.page.scss'],
})
export class AadhaarPage implements OnInit {
  @ViewChild('aadhaarImage') aadhaarImage;
  @ViewChild('front') front;
  @ViewChild('back') back;
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
      file = null;
      return false;
    }
    return true;
  }

  selectImage(event: Event, type: 'front' | 'back'): void {
    if (
      event.target &&
      event.target instanceof HTMLInputElement &&
      event.target.files &&
      event.target.files.length > 0
    ) {
      const file = event.target.files[0];
      if (this.imageIsValid(file)) {
        if (type === 'front') {
          var aadhaarImage = document.getElementById(
            'aadhaar-image-front'
          ) as HTMLImageElement;
        } else {
          var aadhaarImage = document.getElementById(
            'aadhaar-image-back'
          ) as HTMLImageElement;
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
      this.back.nativeElement.files.length > 0 ||
      this.front.nativeElement.files.length > 0
    ) {
      this.loaderService.start('Uploading');
      const frontFile = this.front.nativeElement.files[0];
      const backFile = this.back.nativeElement.files[0];
      try {
        var frontImageUrl = await this.databaseService.upload(
          'aadhaarImages/' +
            new Date().getTime() +
            'front-' +
            this.dataProvider.userData?.userId,
          frontFile
        );
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
