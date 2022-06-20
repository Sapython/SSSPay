import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-aadhar',
  templateUrl: './aadhar.page.html',
  styleUrls: ['./aadhar.page.scss'],
})
export class AadharPage implements OnInit {
  @ViewChild('aadharImage') aadharImage;
  @ViewChild('input') input;

  constructor(
    private alertService: AlertsAndNotificationsService,
    private loaderService: LoaderService,
    private databaseService: DatabaseService,
    private onboardingService: OnboardingService,
    private router: Router
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
        const aadharImage = document.getElementById(
          'aadhar-image'
        ) as HTMLImageElement;
        aadharImage.src = URL.createObjectURL(file);
      } else {
        event.target.value = '';
      }
    }
  }

  submit(): void {
    if (this.input.nativeElement.files.length > 0) {
      this.loaderService.start('Uploading');
      const file = this.input.nativeElement.files[0];
      this.databaseService
        .upload('Aadhar Images/' + new Date().getTime(), file)
        .then((url) => {
          this.loaderService.stop();
          if (typeof url === 'string' || url instanceof String) {
            this.onboardingService.details.aadharImageUrl = url;
            this.alertService.presentToast(
              'Aadhar uploaded successfully.',
              'info'
            );
            this.router.navigate(['onboarding/pan']);
          } else {
            this.alertService.presentToast(url, 'error');
          }
        });
    }
  }
}
