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
    location:any;
  ngOnInit() {
    window.navigator.geolocation.getCurrentPosition(
      (response) => {
        if (response) {
          if (response) {
            this.location = {
              latitude: response.coords.latitude,
              longitude: response.coords.longitude,
            };
            this.alertify.presentToast('Location Found');
          } else {
            this.alertify.presentToast('Location Not Found', 'error');
            // this.alertService.presentToast(response.message);
            this.router.navigate(['/homepage']);
          }
        }
      },
      (error) => {},
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
  }

  async payBill() {
    const transaction: Transaction = {
      ownerId:this.dataProvider.userData?.ownerId || null,
      serviceType:'other',
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
        latitude:this.location.latitude,
        longitude:this.location.longitude,
      },
      balance: this.dataProvider.wallet.balance,
      userId: this.dataProvider.userData.userId,
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
