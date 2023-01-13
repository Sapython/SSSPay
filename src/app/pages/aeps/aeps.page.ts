import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';
import { DatabaseService } from '../../services/database.service';
import { LocationService } from '../../services/location.service';
import { AlertsAndNotificationsService } from '../../services/uiService/alerts-and-notifications.service';
import { BankListModalComponent } from './bank-list-modal/bank-list-modal.component';

import { registerPlugin } from '@capacitor/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/structures/method.structure';
import { DataProvider } from 'src/app/providers/data.provider';
import { environment } from 'src/environments/environment';
import { PromptComponent } from 'src/app/prompt/prompt.component';
import { Geolocation } from '@capacitor/geolocation';
export interface RdServicePlugin {
  getDeviceInfo(): Promise<{ value: string }>;
  getFingerPrint(options: {
    type: 'morpho' | 'mantra' | 'mantraIris' | 'startek';
  }): Promise<{ fingerprint: string }>;
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
  paymentType: string = '';
  fingerPrintData: any;
  bankId: string;
  pidData: string = "";
  selectedBank: any = { name: 'Select Bank', id: '' };
  dataModel:boolean = false;
  definedBanks:any[] = [
    {
      "aadharpayiino": null,
      "activeFlag": "1",
      "bankName": "State Bank of India",
      "id": "85",
      "image":"assets/bankLogos/sbi.png",
      "iinno": "607094"
    },
    {
      "aadharpayiino": null,
      "activeFlag": "1",
      "bankName": "Punjab National Bank",
      "id": "65",
      "image":"assets/bankLogos/pnbBank.png",
      "iinno": "607027"
    },
    {
      "aadharpayiino": null,
      "activeFlag": "1",
      "bankName": "Bank Of Baroda",
      "id": "13",
      "image":"assets/bankLogos/bankOfBaroda.png",
      "iinno": "606985"
    },
    {
      "aadharpayiino": null,
      "activeFlag": "1",
      "bankName": "Bank of India",
      "id": "14",
      "image":"assets/bankLogos/bankOfIndia.jpg",
      "iinno": "508505"
    }
  ]
  aepsForm: UntypedFormGroup = new UntypedFormGroup({
    latitude: new UntypedFormControl('', [Validators.required]),
    longitude: new UntypedFormControl('', [Validators.required]),
    aadhaarNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{12}$/),
    ]),
    mobileNumber: new UntypedFormControl(null,
      [Validators.required, Validators.pattern(/^(0|)[1-9][0-9]{9}$/)]
    ),
    amount: new UntypedFormControl('50', [
      Validators.required,
      Validators.pattern(/^(0|)[1-9][0-9]*$/),
      Validators.min(50)
    ]),
    transactionType: new UntypedFormControl('', [Validators.required]),
    requestRemarks: new UntypedFormControl(''),
  });

  constructor(
    private databaseService: DatabaseService,
    private locationService: LocationService,
    private alertService: AlertsAndNotificationsService,
    private router: Router,
    private modalController: ModalController,
    private serverService: ServerService,
    private dataProvider: DataProvider,
    private transactionService: TransactionService,
    private platform: Platform,
    private alertify: AlertsAndNotificationsService,
  ) {}

  async ngOnInit() {
    // Get location
    try{
      const coordinates = await Geolocation.getCurrentPosition();
    } catch (e) {
      console.log(e);
      this.alertify.presentToast('Location Not Found', 'error');
    }
    window.navigator.geolocation.getCurrentPosition(
      (response) => {
        if (response) {
          if (response) {
            this.aepsForm.patchValue({
              latitude: response.coords.latitude,
              longitude: response.coords.longitude,
            });
            this.alertService.presentToast('Location Found');
          } else {
            this.alertService.presentToast('Location Not Found', 'error');
            // this.alertService.presentToast(response.message);
            this.router.navigate(['/homepage']);
          }
        }
      },
      (error) => {},
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
    // Get list of banks
    this.serverService
      .getAepsBanksList()
      .then((data: any) => {
        if ('error' in data) {
          this.alertService.presentToast(data.error);
          this.router.navigate(['/homepage']);
          return;
        }
        console.log(data.banklist.data);
        this.banks = data.banklist.data;
      })
      .catch((error) => {
        console.error(error);
        this.alertService.presentToast(
          'Something went wrong while getting bank list'
        );
      });
  }

  submit() {
    if (this.aepsForm.valid) {
      if (this.fingerPrintData) {
        this.continueTransaction();
      } else {
        this.alertService.presentToast(
          'Please scan your finger print',
          'error'
        );
      }
    } else {
      this.checkValidity();
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

  setValue(value){
    this.selectedBank = value
    console.log(this.selectedBank);
  }

  log(radio){
    console.log(radio);
  }

  async scanFingerPrint(value) {
    const parser = new DOMParser();
    if (!environment.production) {
      console.log(value);
      if (confirm('Do you want to proceed with the online fingerprint ?')) {
        const data = await this.databaseService.getLog();
        console.log(data.data().message);
        this.fingerPrintData = data.data().message;
        let respDoc = parser.parseFromString(this.fingerPrintData,'text/xml')
        if (respDoc.getElementsByTagName('Resp')){
          console.log(respDoc.getElementsByTagName('Resp')[0].textContent);
        }
        return;
      } else {
        const modal = await this.modalController.create({
          component: PromptComponent,
        })
        await modal.present();
        this.fingerPrintData = (await modal.onWillDismiss()).data.trim();
        console.log(this.fingerPrintData.trim());
        return;
      }
    }
    if (value === 'morpho') {
      const { fingerprint } = await RdService.getFingerPrint({
        type: 'morpho',
      });
      // window.navigator.clipboard.writeText(fingerprint);
      let respDoc = parser.parseFromString(fingerprint.replace('{PID=','').replace('}',''),'text/xml')
      // this.pidData = fingerprint.replace('{PID=','').replace('}','')
      //   this.dataModel = true;
      //   setTimeout(() => {
      //     this.dataModel = false;
      //   },20000)
      // alert(fingerprint.replace('{PID=','').replace('}',''));
      if (respDoc.getElementsByTagName('Resp')[0].attributes['errCode'].value != '0' ){
        this.alertify.presentToast(respDoc.getElementsByTagName('Resp')[0].attributes['errInfo'].value,'error',5000);
        return false;
      } else {
        this.alertify.presentToast('Capture Successful')
      }
      this.databaseService.logBug(fingerprint.replace('{PID=','').replace('}',''));
      if (fingerprint) {
        this.fingerPrintData = fingerprint.replace('{PID=','').replace('}','');
      } else {
        this.fingerPrintData = undefined;
        this.alertify.presentToast('Something went wrong');
      }
    } else if (value == 'mantra') {
      const { fingerprint } = await RdService.getFingerPrint({
        type: 'mantra',
      });
      // alert(fingerprint);
      window.navigator.clipboard.writeText(fingerprint);
      let respDoc = parser.parseFromString(fingerprint.replace('{PID=','').replace('}',''),'text/xml')
      if (respDoc.getElementsByTagName('Resp')[0].attributes['errCode'].value != '0' ){
        this.alertify.presentToast(respDoc.getElementsByTagName('Resp')[0].attributes['errInfo'].value,'error',5000);
        return false;
      } else {
        this.alertify.presentToast('Capture Successful')
      }
      this.databaseService.logBug(fingerprint.replace('{PID=','').replace('}',''));
      if (fingerprint) {
        let raw = fingerprint.replace('{PID=','').replace('}','');
        // convert to xml object
        let respDoc = ( new window.DOMParser() ).parseFromString(raw, "text/xml");
        this.fingerPrintData = '<?xml version="1.0"?>'+new XMLSerializer().serializeToString(respDoc);
        // this.pidData = this.fingerPrintData
        // this.dataModel = true;
        // setTimeout(() => {
        //   this.dataModel = false;
        // },20000)
      } else {
        this.fingerPrintData = undefined;
        this.alertify.presentToast('Something went wrong');
      }
    } else if (value == 'startek') {
      const { fingerprint } = await RdService.getFingerPrint({
        type: 'startek',
      });
      // alert(fingerprint);
      // this.pidData = fingerprint.replace('{PID=','').replace('}','')
        // this.dataModel = true;
        // setTimeout(() => {
        //   this.dataModel = false;
        // },20000)
      let respDoc = parser.parseFromString(fingerprint.replace('{PID=','').replace('}',''),'text/xml')
      if (respDoc.getElementsByTagName('Resp')[0].attributes['errCode'].value != '0' ){
        this.alertify.presentToast(respDoc.getElementsByTagName('Resp')[0].attributes['errInfo'].value,'error',5000);
        return false;
      } else {
        this.alertify.presentToast('Capture Successful')
      }
      this.databaseService.logBug(fingerprint.replace('{PID=','').replace('}',''));
      if (fingerprint) {
        this.fingerPrintData = fingerprint.replace('{PID=','').replace('}','');
      } else {
        this.fingerPrintData = undefined;
        this.alertify.presentToast('Something went wrong');
      }
    } else if (value == 'mantraIris') {
      const { fingerprint } = await RdService.getFingerPrint({
        type: 'mantraIris',
      });
      let respDoc = parser.parseFromString(fingerprint.replace('{PID=','').replace('}',''),'text/xml')
      if (respDoc.getElementsByTagName('Resp')[0].attributes['errCode'].value != '0' ){
        this.alertify.presentToast(respDoc.getElementsByTagName('Resp')[0].attributes['errInfo'].value,'error',5000);
        return false;
      } else {
        this.alertify.presentToast('Capture Successful')
      }
      // alert('Got data')
      this.databaseService.logBug(fingerprint.replace('{PID=','').replace('}',''));
      // alert(fingerprint);
      if (fingerprint) {
        this.fingerPrintData = fingerprint.replace('{PID=','').replace('}','');
      } else {
        this.fingerPrintData = undefined;
        this.alertify.presentToast('Something went wrong');
      }
    }
  }

  async continueTransaction() {
    this.dataProvider.pageSetting.blur = true;
    const data = {
      latitude: this.aepsForm.value.latitude,
      longitude: this.aepsForm.value.longitude,
      mobile_number: this.aepsForm.value.mobileNumber,
      referenceNo:
        this.generateRandomId().toString() +
        this.aepsForm.value.mobileNumber.toString(),
      adhaarNumber: this.aepsForm.value.aadhaarNumber,
      accessModeType: 'SITE',
      nationalBankIdentification: this.selectedBank.iinno,
      requestRemarks: "AEPS transaction will be done by " + this.dataProvider.userData.displayName + " on " + (new Date()).toLocaleString() + " to " + this.aepsForm.value.aadhaarNumber + " on "+ this.aepsForm.value.mobileNumber,
      data: this.fingerPrintData,
      pipe: 'bank1',
      transactionType: this.aepsForm.value.transactionType,
      is_iris: false,
    };
    this.databaseService.addBug(data);
    if (this.aepsForm.value.transactionType == 'BE') {
      const transaction: Transaction = {
        amount: 0,
        groupId:this.dataProvider.userData?.groupId || null,
        serviceType:'aeps',
        title: 'Balance Enquiry',
        description: 'Balance Enquiry',
        type: 'aeps',
        status: 'started',
        balance: this.dataProvider.wallet.balance,
        date: new Date(),
        completed: false,
        extraData: {
          merchantCode: this.dataProvider.userData?.userId,
          aepsData: data,
          latitude: this.aepsForm.value.latitude,
          longitude: this.aepsForm.value.longitude,
          bankName:this.selectedBank?.bankName
        },
        receiver: 'AEPS',
        error: null,
      };
      // alert(JSON.stringify(data.data) )
      // this.pidData = data.data;
      // this.dataModel = true;
      this.transactionService
        .addTransaction(transaction)
        .then((transaction) => {
          this.serverService
            .aepsGetBalanceEnquiry(transaction.id)
            .then((enquiry) => {
              console.log(enquiry);
              this.alertify.presentToast('Balance Enquiry done');
              this.router.navigate(['../history/detail/' + transaction.id]);
              this.dataProvider.pageSetting.blur = false;
            })
            .catch((error) => {
              console.error(error);
              this.alertify.presentToast(error.error);
              this.dataProvider.pageSetting.blur = false;
            });
        })
        .catch((error) => {
          this.alertify.presentToast('Something went wrong');
          console.error(error);
          this.dataProvider.pageSetting.blur = false;
        });
    } else if (this.aepsForm.value.transactionType == 'CW') {
      const transaction: Transaction = {
        amount: this.aepsForm.value.amount,
        title: 'Cash Withdrawal',
        groupId:this.dataProvider.userData?.groupId || null,
        serviceType:'aeps',
        description: 'Cash Withdrawal',
        type: 'aeps',
        status: 'started',
        balance: this.dataProvider.wallet.balance,
        date: new Date(),
        completed: false,
        extraData: {
          merchantCode: this.dataProvider.userData?.userId,
          aepsData: data,
          latitude: this.aepsForm.value.latitude,
          longitude: this.aepsForm.value.longitude,
          bankName:this.selectedBank?.bankName
        },
        receiver: 'AEPS',
        error: null,
      };
      this.transactionService
        .addTransaction(transaction)
        .then((transaction) => {
          this.serverService
            .aepsCashWithdrawal(transaction.id)
            .then((withdrawal) => {
              console.log(withdrawal);
              this.alertify.presentToast('Cash Withdrawal done');
              this.router.navigate(['../history/detail/' + transaction.id]);
              this.dataProvider.pageSetting.blur = false;
            })
            .catch((error) => {
              console.error(error);
              this.alertify.presentToast(error.error);
              this.dataProvider.pageSetting.blur = false;
            });
        })
        .catch((error) => {
          this.alertify.presentToast('Something went wrong');
          console.error(error);
          this.dataProvider.pageSetting.blur = false;
        });
    } else if (this.aepsForm.value.transactionType == 'MS') {
      // ms = mini statement
      const transaction: Transaction = {
        amount: 0,
        groupId:this.dataProvider.userData?.groupId || null,
        serviceType:'aeps',
        title: 'Mini Statement',
        description: 'Mini Statement',
        type: 'aeps',
        status: 'started',
        balance: this.dataProvider.wallet.balance,
        date: new Date(),
        completed: false,
        extraData: {
          merchantCode: this.dataProvider.userData?.userId,
          aepsData: data,
          latitude: this.aepsForm.value.latitude,
          longitude: this.aepsForm.value.longitude,
          bankName:this.selectedBank?.bankName
        },
        receiver: 'AEPS',
        error: null,
      };
      this.transactionService
        .addTransaction(transaction)
        .then((transaction) => {
          this.serverService
            .aepsMiniStatement(transaction.id)
            .then((miniStatement) => {
              console.log(miniStatement);
              this.alertify.presentToast('Mini Statement done');
              this.router.navigate(['../history/detail/' + transaction.id]);
              this.dataProvider.pageSetting.blur = false;
            })
            .catch((error) => {
              console.error(error);
              this.alertify.presentToast(error.error);
              this.dataProvider.pageSetting.blur = false;
            });
        })
        .catch((error) => {
          this.alertify.presentToast('Something went wrong');
          console.error(error);
          this.dataProvider.pageSetting.blur = false;
        });
    } else if (this.aepsForm.value.transactionType === 'M') {
      // m = Aadhaar Pay
      const transaction: Transaction = {
        amount: this.aepsForm.value.amount,
        groupId:this.dataProvider.userData?.groupId || null,
        serviceType:'aeps',
        title: 'Aadhaar Pay',
        description: 'Aadhaar Pay',
        type: 'aeps',
        status: 'started',
        balance: this.dataProvider.wallet.balance,
        date: new Date(),
        completed: false,
        extraData: {
          merchantCode: this.dataProvider.userData?.userId,
          aepsData: data,
          latitude: this.aepsForm.value.latitude,
          longitude: this.aepsForm.value.longitude,
          bankName:this.selectedBank?.bankName
        },
        receiver: 'AEPS',
        error: null,
      };
      this.transactionService
        .addTransaction(transaction)
        .then((transaction) => {
          this.serverService
            .aepsAadhaarPay(transaction.id)
            .then((aadhaarPay) => {
              console.log(aadhaarPay);
              this.alertify.presentToast('Aadhaar Pay done');
              this.router.navigate(['../history/detail/' + transaction.id]);
              this.dataProvider.pageSetting.blur = false;
            }
            )
            .catch((error) => {
              console.error(error);
              this.alertify.presentToast(error.error);
              this.dataProvider.pageSetting.blur = false;
            }
            );
          }).catch((error) => {
            this.alertify.presentToast('Something went wrong');
            console.error(error);
            this.dataProvider.pageSetting.blur = false;
          })
    } else {
      this.alertify.presentToast('Please select a correct transaction type');
    }
  }

  checkValidity() {
    console.log(this.aepsForm);
    let errors: any[] = [];
    Object.keys(this.aepsForm.controls).forEach((key) => {
      if (!this.aepsForm.get(key).valid) {
        errors.push(key);
      }
    });
    console.log(errors);
    this.alertify.presentToast('Problems With ' + errors.join(', '), 'error');
  }

  // generate random id
  generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }

  checkInput(event, type: 'number' | 'aadhaar') {
    console.log(event, type);
    if (event.detail.target.value.length >= 10 && type == 'number') {
      event.target.setBlur();
    } else if (event.detail.target.value.length >= 12 && type == 'aadhaar') {
      event.target.setBlur();
    }
  }
}
