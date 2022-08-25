import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { LocationService } from 'src/app/services/location.service';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { Transaction } from 'src/app/structures/method.structure';

@Component({
  selector: 'app-lic',
  templateUrl: './lic.page.html',
  styleUrls: ['./lic.page.scss'],
})
export class LicPage implements OnInit {
  licBillForm: FormGroup = new FormGroup({
    caNumber: new FormControl(''),
    email: new FormControl(''),
  });
  billFetched: boolean = false;
  bill: any;
  constructor(
    private serverService: ServerService,
    private transactionService: TransactionService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider:DataProvider,
    private locationService: LocationService,
    private router:Router
  ) {}

  ngOnInit() {}
  fetchLicBill() {
    if (this.licBillForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      this.serverService
        .fetchLicBill(this.licBillForm.value)
        .then((data: any) => {
          this.bill = data;
          this.billFetched = true;
        }).catch((error)=>{
          this.billFetched = false;
          this.alertify.presentToast('Could not fetch bill','error');
          console.log(error)
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        });
    } else {

      this.alertify.presentToast('Please fill all the fields', 'error');
    }
  }
  async getCoordinates(){
    const response = await this.locationService.getLatitudeAndLongitude();
    if (response.status){
      return response;
    } else {
      return null;
    }
  }
  async payBill() {
    const coordinates = await this.getCoordinates()
    if (coordinates == null){
      this.alertify.presentToast("Could not get your location. Please try again later.")
      return;
    }
    let transaction: Transaction = {
      title: 'Lic Bill Payment',
      receiver: 'lic',
      date: new Date(),
      type: 'lic',
      amount: this.bill.amount,
      description: 'Lic Bill Payment',
      balance: 0,
      completed: false,
      status: 'started',
      error: null,
      extraData: {
        bill: this.bill,
        formData: this.licBillForm.value,
        customerId: this.dataProvider.userData.userId,
        latitude:coordinates.latitude,
        longitude:coordinates.longitude,
      },
    };
    this.dataProvider.pageSetting.blur = true;
    this.transactionService.addTransaction(transaction).then((transaction: any) => {
      this.serverService.payLicBill(transaction.id).then((data: any) => {
        this.alertify.presentToast('Payment Successful');
        console.log(data);
        this.router.navigate(['../history/detail/'+transaction.id]);
      }).catch((error:any)=>{
        this.alertify.presentToast('Payment Failed','error');
        console.log(error);
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      });
    });
  }
}
