import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';
import { DatabaseService } from '../../services/database.service';
import { LocationService } from '../../services/location.service';
import { AlertsAndNotificationsService } from '../../services/uiService/alerts-and-notifications.service';
import { BankListModalComponent } from './bank-list-modal/bank-list-modal.component';

import { registerPlugin } from '@capacitor/core';

export interface RdServicePlugin {
  getDeviceInfo(): Promise<{ value: string }>;
  getFingerPrint(): Promise<{ fingerprint: string }>;
}
const RdService = registerPlugin<RdServicePlugin>('RdService');
export default RdService;
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
  bankId: string;
  selectedBank:any = {"name":"Select Bank","id":""};
  aepsForm: FormGroup = new FormGroup({
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    aadhaarNumber: new FormControl('453453453455', [
      Validators.required,
      Validators.pattern(/^[0-9]{12}$/),
    ]),
    mobileNumber: new FormControl('6546464646', [
      Validators.required,
      Validators.pattern(/^(0|)[1-9][0-9]{9}$/),
    ]),
    amount: new FormControl('50', [
      Validators.required,
      Validators.pattern(/^(0|)[1-9][0-9]*$/),
    ]),
    transactionType: new FormControl('', [Validators.required]),
    requestRemarks: new FormControl(''),
  });

  constructor(
    private databaseService: DatabaseService,
    private locationService: LocationService,
    private alertService: AlertsAndNotificationsService,
    private router: Router,
    private modalController: ModalController,
    private serverService:ServerService,
    private platform: Platform
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
    this.serverService.getAepsBanksList().then((data:any)=>{
      if ("error" in data) {
        this.alertService.presentToast(data.error);
        this.router.navigate(['/homepage']);
        return
      }
      console.log(data.banklist.data);
      this.banks = data.banklist.data;
    }).catch((error)=>{
      console.error(error);
      this.alertService.presentToast('Something went wrong');
    })
  }

  submit() {
    if (this.aepsForm.valid) {
      // Send aepsForm.value
      console.log(this.aepsForm.value);
    }
  }
  async openBankModal() {
    const modal = await this.modalController.create({
      component: BankListModalComponent,
      componentProps: {
        banks: this.banks,
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data: any) => {
      if (data.data) {
        console.log(data.data);
        // this.aepsForm.value.nationalBankIdentification = data.data.iinno;
        this.selectedBank = data.data;
      }
    });
  }

  async scanFingerPrint(value){
    console.log(value);
    if (value==='morpho'){
      const { fingerprint } = await RdService.getFingerPrint();
      // alert('Got data')
      // alert(fingerprint);
      const data = {
        latitude:this.aepsForm.value.latitude,
        longitude:this.aepsForm.value.longitude,
        mobile_number:this.aepsForm.value.mobileNumber,
        referenceNo:this.generateRandomId().toString()+this.aepsForm.value.mobileNumber.toString(),
        adhaarNumber:this.aepsForm.value.aadhaarNumber,
        accessModeType:'SITE',
        nationalBankIdentification:this.selectedBank.iinno,
        requestRemarks:this.aepsForm.value.requestRemarks,
        data:fingerprint,
        pipe:"bank1",
        transactionType:this.aepsForm.value.transactionType,
        is_iris:false,
      }
      console.log(data);
      alert(JSON.stringify(data));
    }
  }

  // generate random id 
  generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }
}
