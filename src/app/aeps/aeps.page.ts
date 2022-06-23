import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LocationService } from '../services/location.service';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-aeps',
  templateUrl: './aeps.page.html',
  styleUrls: ['./aeps.page.scss'],
})
export class AepsPage implements OnInit {
  banks: {
    id: string;
    name: string;
  }[];

  aepsForm: FormGroup = new FormGroup({
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    nationalbankidentification: new FormControl('', [Validators.required]),
    adhaarnumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{12}$/),
    ]),
    mobilenumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(0|)[1-9][0-9]{9}$/),
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(0|)[1-9][0-9]*$/),
    ]),
    transactiontype: new FormControl('', [Validators.required]),
    requestremarks: new FormControl(''),
  });

  constructor(
    private databaseService: DatabaseService,
    private locationService: LocationService,
    private alertService: AlertsAndNotificationsService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get location
    this.locationService.getLatitudeAndLongitude().then((response) => {
      if (response.status) {
        this.aepsForm.patchValue({
          latitude: response.latitude,
          longitude: response.longitude,
        });
      } else {
        this.alertService.presentToast(response.message);
        this.router.navigate(['/homepage']);
      }
    });

    // Get list of banks
    this.databaseService.getBanks().then((docs) => {
      this.banks = [];
      docs.forEach((doc) => {
        this.banks.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
    });
  }

  submit() {
    if (this.aepsForm.valid) {
      // Send aepsForm.value
      console.log(this.aepsForm.value);
    }
  }
}
