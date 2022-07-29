import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import {
  Contact,
  Contacts,
  PermissionStatus,
} from '@capacitor-community/contacts';
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
  mobileRechargeForm: FormGroup = new FormGroup({
    mobileNumber: new FormControl('', [Validators.required]),
    operator: new FormControl(''),
    circle: new FormControl(''),
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
    if (this.platform.is('capacitor')) {
      Contacts.getPermissions().then((permission: PermissionStatus) => {
        if (permission.granted) {
          this.alertify.presentToast('Permission granted');
          Contacts.getContacts().then((contacts: { contacts: Contact[] }) => {
            this.contacts = contacts.contacts;
            contacts.contacts.forEach((contact: Contact) => {
              console.log('contact', contact);
            });
          });
        } else {
          this.alertify.presentToast('Permission denied');
        }
      });
    }
    this.databaseService.getOperators().then((docs) => {
      this.operators = [];
      docs.forEach((doc) => {
        this.operators.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
    });
    this.serverService.getMobileOperators().then((data) => {
      this.operators = data;
      console.log('getMobileOperators', this.operators);
    });
  }
  getCircleAndOperator($event) {
    console.log('getCircleAndOperator', $event);
    if (this.mobileRechargeForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      this.serverService
        .getCircleAndOperator($event)
        .then(async (circleAndOperator) => {
          console.log('getCircleAndOperator-data', circleAndOperator);
          if (circleAndOperator['response_code'] == 1) {
            this.showOperatorAndCircle = false;
            circleAndOperator.info['mobileNumber'] = this.mobileRechargeForm.get('mobileNumber').value;
            this.getPlans(circleAndOperator.info);
          } else {
            this.mobileRechargeForm
              .get('circle')
              .addValidators([Validators.required]);
            this.mobileRechargeForm
              .get('operator')
              .addValidators([Validators.required]);
            this.alertify.presentToast(
              'Cannot fetch operators and circles. Please add them manually'
            );
            this.showOperatorAndCircle = true;
          }
        })
        .finally(() => {
          this.dataProvider.pageSetting.blur = false;
        });
    }
  }
  async getPlans(circleAndOperator) {
    console.log('getPlans =====', circleAndOperator);
    const modal = await this.modalController.create({
      component: SelectPlansPage,
      componentProps: {
        circle: circleAndOperator.circle,
        operator: circleAndOperator.operator,
        mobileNumber: circleAndOperator.mobileNumber,
        operatorsId:this.operators.filter((operator)=>operator.name==circleAndOperator.operator)[0].id
      },
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.dataProvider.pageSetting.blur = false;
    this.mobileRechargeForm.reset();
  }
}
