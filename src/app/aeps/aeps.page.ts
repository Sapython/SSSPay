import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { UpiService } from '../services/upi.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
    private router: Router,
    private databaseService: DatabaseService,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    // Get location
    this.geolocation
      .getCurrentPosition()
      .then((response) => {
        this.aepsForm.patchValue({
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        });
      })
      .catch((error) => {
        console.error('Error getting location', error);
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
    }
  }
}
