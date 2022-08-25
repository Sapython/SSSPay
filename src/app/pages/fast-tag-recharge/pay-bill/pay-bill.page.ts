import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { LocationService } from 'src/app/services/location.service';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { Transaction } from 'src/app/structures/method.structure';

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.page.html',
  styleUrls: ['./pay-bill.page.scss'],
})
export class PayBillPage implements OnInit {
  @Input() billData: any;
  constructor(
    public modalController: ModalController,
    private serverService: ServerService,
    private transactionService: TransactionService,
    private dataProvider: DataProvider,
    private alertify: AlertsAndNotificationsService,
    private locationService: LocationService,
    private router:Router
  ) {}

  ngOnInit() {}
  async getCoordinates() {
    const response = await this.locationService.getLatitudeAndLongitude();
    if (response.status) {
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
    const transaction: Transaction = {
      title: 'Fastag Recharge',
      amount: Number(this.billData.amount),
      receiver: this.billData.name,
      date: new Date(),
      type: 'fastTag',
      description:
        'FasTag Recharge done for ' +
        this.billData.name +
        ' with amount ' +
        this.billData.amount,
      status: 'started',
      idempotencyKey:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      completed: false,
      error: null,
      extraData: {
        ...this.billData,
        customerId: this.dataProvider.userData.userId,
        latitude:coordinates.latitude,
        longitude:coordinates.longitude,
      },
      balance: this.dataProvider.wallet.balance,
    };
    this.dataProvider.pageSetting.blur = true;
    this.transactionService.addTransaction(transaction).then((transaction) => {
      this.serverService
        .payFastTagBill(transaction.id)
        .then((data: any) => {
          console.log(data);
          this.dataProvider.pageSetting.blur = false;
          this.modalController.dismiss()
          this.router.navigate(['../history/detail/'+transaction.id]);
          this.alertify.presentToast('Transaction Successful');
        })
        .catch((error) => {
          this.dataProvider.pageSetting.blur = false;
          this.modalController.dismiss()
          this.alertify.presentToast('Some error occurred');
        })
        .finally(() => {
          this.dataProvider.pageSetting.blur = false;
        });
    });
  }
}
