import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { LocationService } from 'src/app/services/location.service';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { Transaction } from 'src/app/structures/method.structure';

@Component({
  selector: 'app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrls: ['./provider-page.component.scss'],
})
export class ProviderPageComponent implements OnInit {
  @Input() operator: any = {};
  fields: any[] = [];
  billFetched: boolean = false;
  bill: any;
  constructor(
    private serverService: ServerService,
    private dataProvider: DataProvider,
    private transactionService: TransactionService,
    private alertify: AlertsAndNotificationsService,
    private locationService: LocationService,
    private router: Router,
    private modalController:ModalController
  ) {}
  billProviderForm = new FormGroup({
    mainField: new FormControl('', [
      Validators.required,
      Validators.pattern(RegExp(this.operator.regex)),
    ]),
  });
  ngOnInit() {
    console.log('operator-operator ---', this.operator);
    var fields = [];
    var counter = 0;
    var fieldName = '';
    while (fieldName != null) {
      const field = {};
      counter += 1;
      fieldName = this.operator['ad' + counter + '_d_name'];
      if (typeof fieldName == 'string') {
        field['name'] = fieldName;

        const regexp = RegExp(this.operator['ad' + counter + '_regex']);
        console.log('REGEXP', regexp);
        const control = new FormControl('', [
          Validators.required,
          Validators.pattern(regexp),
        ]);
        this.billProviderForm.addControl(
          this.operator['ad' + counter + '_name'],
          control
        );
        field['control'] = control;
        fields.push(field);
      }
    }
    this.fields = fields;
  }
  getBill() {
    console.log(
      'GET BILL',
      this.billProviderForm.value,
      Number(this.billProviderForm.value.mainField),
      this.operator.id
    );
    this.serverService
      .fetchBillPayment(
        Number(this.operator.id),
        Number(this.billProviderForm.value.mainField)
      )
      .then((res) => {
        console.log('response =>', res);
        this.billFetched = true;
        this.bill = res;
      });
  }

  async payBill() {
    const coordinates = await this.getCoordinates();
    if (coordinates == null) {
      this.alertify.presentToast(
        'Could not get your location. Please try again later.'
      );
      return;
    }
    const transaction: Transaction = {
      amount: this.bill.amount,
      title: 'Bill Payment',
      description:
        'Bill Payment of ' +
        this.bill.amount.toString() +
        ' to ' +
        this.bill.name.toString(),
      type: 'bbps',
      date: new Date(),
      balance: this.dataProvider.wallet.balance,
      completed: false,
      status: 'started',
      receiver: this.bill.name,
      error: null,
      extraData: {
        bill: this.bill,
        operator: this.operator,
        fields: this.billProviderForm.value,
        customerId: this.dataProvider.userData.userId,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    };
    this.dataProvider.pageSetting.blur = true;
    this.transactionService.addTransaction(transaction).then((transaction) => {
      console.log('transaction added', transaction);

      this.serverService.payBillPayment(transaction.id)
      .then((payment) => {
        console.log('payment', payment);
        if (payment.response_code == 1) {
          console.log('payment', payment);
          this.alertify.presentToast('Payment Successful');
          this.modalController.dismiss()
          this.router.navigate(['../history/detail/'+transaction.id]);
        } else {
            throw new Error(payment);
        }
        })
        .catch((err) => {
          console.log("Error 2",err);
          this.alertify.presentToast(err.error.message, 'error');
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        });
    }).catch((err) => {
      console.log("Error 1",err);
      this.alertify.presentToast(err.error.message, 'error');
      this.dataProvider.pageSetting.blur = false;
    })
  }

  async getCoordinates() {
    const response = await this.locationService.getLatitudeAndLongitude();
    if (response.status) {
      return response;
    } else {
      return null;
    }
  }
}
