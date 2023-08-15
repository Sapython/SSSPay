import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { ModalController, Platform } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { SelectPlansPage } from './select-plans/select-plans.page';

@Component({
  selector: 'app-mobile-recharge',
  templateUrl: './mobile-recharge.page.html',
  styleUrls: ['./mobile-recharge.page.scss'],
})
export class MobileRechargePage implements OnInit, OnDestroy {
  searchVall: string;
  operators: {
    id: string;
    name: string;
  }[];
  contacts = [];
  circles: string[] = [
    'Andhra Pradesh Telangana',
    'Assam',
    'Bihar Jharkhand',
    'Chennai',
    'Delhi NCR',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu Kashmir',
    'Karnataka',
    'Kerala',
    'Kolkata',
    'Madhya Pradesh Chhattisgarh',
    'Maharashtra Goa',
    'Mumbai',
    'North East',
    'Orissa',
    'Punjab',
    'Rajasthan',
    'Tamil Nadu',
    'UP East',
    'UP West',
    'West Bengal',
  ];
  showOperatorAndCircle: boolean = false;
  searchingOperator: boolean = false;
  mobileRechargeForm: FormGroup = new FormGroup({
    mobileNumber: new FormControl('', [Validators.required]),
    operator: new FormControl('',Validators.required),
    circle: new FormControl('',Validators.required),
  });

  constructor(
    private databaseService: DatabaseService,
    private platform: Platform,
    private alertify: AlertsAndNotificationsService,
    private serverService: ServerService,
    private dataProvider: DataProvider,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.databaseService.getOperators().then((docs) => {
      this.operators = [];
      docs.forEach((doc) => {
        this.operators.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
    })
    this.serverService.getMobileOperators().then((data) => {
      this.operators = data;
      console.log('getMobileOperators', this.operators);
    });
  }

  getCircleAndOperator(event) {
    console.log('getCircleAndOperator', event);
    this.searchingOperator = true;
    this.serverService.getCircleAndOperator(event.detail.value).then(async (circleAndOperator) => {
      console.log('getCircleAndOperator-data', circleAndOperator);
    }).finally(() => {
      this.searchingOperator = false;
    });
  }


  async getPlans() {
    console.log(this.mobileRechargeForm.value)
    const modal = await this.modalController.create({
      component: SelectPlansPage,
      componentProps: {
        circle: this.mobileRechargeForm.value.circle,
        operator: this.mobileRechargeForm.value.operator.name,
        mobileNumber: this.mobileRechargeForm.value.mobileNumber,
        operatorsId: this.mobileRechargeForm.value.operator.id,
      },
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.dataProvider.pageSetting.blur = false;
    this.mobileRechargeForm.reset();
  }
}
