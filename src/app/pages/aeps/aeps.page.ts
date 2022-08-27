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
  selectedBank: any = { name: 'Select Bank', id: '' };
  aepsForm: UntypedFormGroup = new UntypedFormGroup({
    latitude: new UntypedFormControl('', [Validators.required]),
    longitude: new UntypedFormControl('', [Validators.required]),
    aadhaarNumber: new UntypedFormControl('433792111395', [
      Validators.required,
      Validators.pattern(/^[0-9]{12}$/),
    ]),
    mobileNumber: new UntypedFormControl(
      this.dataProvider.userData.phoneNumber,
      [Validators.required, Validators.pattern(/^(0|)[1-9][0-9]{9}$/)]
    ),
    amount: new UntypedFormControl('50', [
      Validators.required,
      Validators.pattern(/^(0|)[1-9][0-9]*$/),
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
    private alertify: AlertsAndNotificationsService
  ) {}

  ngOnInit() {
    // Get location
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
  async getCoordinates() {
    const response = await this.locationService.getLatitudeAndLongitude();
    if (response.status) {
      return response;
    } else {
      return null;
    }
  }

  async scanFingerPrint(value) {
    if (!environment.production) {
      console.log(value);
      if (confirm('Do you want to proceed with the online fingerprint ?')) {
        const data = await this.databaseService.getLog();
        console.log(data.data().message);
        this.fingerPrintData = data.data().message;
        return;
      } else {
        this.fingerPrintData = prompt('Enter your fingerprint');
        return;
      }
    }
    if (value === 'morpho') {
      const { fingerprint } = await RdService.getFingerPrint({
        type: 'morpho',
      });
      // alert('Got data')
      alert(fingerprint);
      this.databaseService.logBug(fingerprint);
      if (fingerprint) {
        this.fingerPrintData = fingerprint;
      } else {
        this.fingerPrintData = undefined;
        this.alertify.presentToast('Something went wrong');
      }
    } else if (value == 'mantra') {
      const { fingerprint } = await RdService.getFingerPrint({
        type: 'mantra',
      });
      // alert('Got data')
      alert(fingerprint);
      this.databaseService.logBug(fingerprint);
      if (fingerprint) {
        this.fingerPrintData = fingerprint;
      } else {
        this.fingerPrintData = undefined;
        this.alertify.presentToast('Something went wrong');
      }
    } else if (value == 'startek') {
      const { fingerprint } = await RdService.getFingerPrint({
        type: 'startek',
      });
      // alert('Got data')
      alert(fingerprint);
      this.databaseService.logBug(fingerprint);
      if (fingerprint) {
        this.fingerPrintData = fingerprint;
      } else {
        this.fingerPrintData = undefined;
        this.alertify.presentToast('Something went wrong');
      }
    } else if (value == 'mantraIris') {
      const { fingerprint } = await RdService.getFingerPrint({
        type: 'mantraIris',
      });
      // alert('Got data')
      alert(fingerprint);
      if (fingerprint) {
        this.fingerPrintData = fingerprint;
      } else {
        this.fingerPrintData = undefined;
        this.alertify.presentToast('Something went wrong');
      }
    }
  }

  async continueTransaction() {
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
      requestRemarks: this.aepsForm.value.requestRemarks,
      data: this.fingerPrintData,
      pipe: 'bank1',
      transactionType: this.aepsForm.value.transactionType,
      is_iris: false,
    };
    if (this.aepsForm.value.transactionType == 'BE') {
      const transaction: Transaction = {
        amount: 0,
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
        },
        receiver: 'AEPS',
        error: null,
      };
      this.transactionService
        .addTransaction(transaction)
        .then((transaction) => {
          this.serverService
            .aepsGetBalanceEnquiry(transaction.id)
            .then((enquiry) => {
              console.log(enquiry);
              this.alertify.presentToast('Balance Enquiry done');
              this.router.navigate(['../history/detail/' + transaction.id]);
            })
            .catch((error) => {
              console.error(error);
              this.alertify.presentToast(error.error);
            });
        })
        .catch((error) => {
          this.alertify.presentToast('Something went wrong');
          console.error(error);
        });
    } else if (this.aepsForm.value.transactionType == 'CW') {
      const transaction: Transaction = {
        amount: this.aepsForm.value.amount,
        title: 'Cash Withdrawal',
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
            })
            .catch((error) => {
              console.error(error);
              this.alertify.presentToast(error.error);
            });
        })
        .catch((error) => {
          this.alertify.presentToast('Something went wrong');
          console.error(error);
        });
    } else if (this.aepsForm.value.transactionType == 'MS') {
      // ms = mini statement
      const transaction: Transaction = {
        amount: 0,
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
            })
            .catch((error) => {
              console.error(error);
              this.alertify.presentToast(error.error);
            });
        })
        .catch((error) => {
          this.alertify.presentToast('Something went wrong');
          console.error(error);
        });
    } else if (this.aepsForm.value.transactionType === 'M') {
      // m = Aadhaar Pay
      const transaction: Transaction = {
        amount: this.aepsForm.value.amount,
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
            }
            )
            .catch((error) => {
              console.error(error);
              this.alertify.presentToast(error.error);
            }
            );
          }).catch((error) => {
            this.alertify.presentToast('Something went wrong');
            console.error(error);
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
