import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  NavController } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  states = [
    {
      id: 1,
      state: 'Andhra Pradesh'
    },
    {
      id: 2,
      state: ' Arunachal Pradesh',
    },
    {
      id: 3,
      state: 'Assam',
    },
    {
      id: 4,
      state: '    Bihar',
    },
    {
      id: 5,
      state: 'Chhattisgarh',
    },
    {
      id: 6,
      state: 'Goa',
    },
    {
      id: 7,
      state: 'Gujarat',
    },
    {
      id: 7,
      state: 'Haryana',
    },
    {
      id: 8,
      state: 'Himachal Pradesh',
    },
    {
      id: 9,
      state: 'Jammu and Kashmir',
    },
    {
      id: 10,
      state: 'Jharkhand',
    },
    {
      id: 11,
      state: 'Karnataka',
    },
    {
      id: 12,
      state: 'Kerala',
    },
    {
      id: 13,
      state: 'Madhya Pradesh',
    },
    {
      id: 14,
      state: 'Maharashtra',
    },
    {
      id: 15,
      state: 'Manipur',
    },
    {
      id: 16,
      state: 'Meghalaya',
    },
    {
      id: 17,
      state: 'Mizoram',
    },
    {
      id: 18,
      state: 'Nagaland',
    },
    {
      id: 19,
      state: 'Odisha',
    },
    {
      id: 20,
      state: 'Punjab',
    },
    {
      id: 21,
      state: 'Rajasthan',
    },
    {
      id: 22,
      state: 'Sikkim',
    },
    {
      id: 23,
      state: 'Tamil Nadu',
    },
    {
      id: 24,
      state: 'Telangana',
    },
    {
      id: 25,
      state: 'Jharkhand',
    },
    {
      id: 26,
      state: 'Tripura',
    },
    {
      id: 27,
      state: 'Uttar Pradesh',
    },
    {
      id: 28,
      state: 'Uttarakhand',
    },
    {
      id: 29,
      state: 'West Bengal'
    },
  ];
  location: FormGroup = new FormGroup({
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [ Validators.required,
      Validators.pattern(/[0-9]*/),
      Validators.minLength(10),
      Validators.maxLength(10),]),
  });

  constructor(
    private navCtrl: NavController,
  ) {}

  ngOnInit() {}
  verifying() {
    
    this.navCtrl.navigateRoot('/onboarding/aadhar');
  }
}
