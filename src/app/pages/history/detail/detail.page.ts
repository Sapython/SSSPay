import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  paymentStatus: string = '';
  amount: number = 0;
  command: string = '';
  transactionId: string = '';
  transactionData:any;
  date: Date = new Date();
  transactionSubscription: Subscription = Subscription.EMPTY;
  retailerId: string = '';
  retailerName: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private alertify: AlertsAndNotificationsService,
    private transactionService: TransactionService,
    private dataProvider:DataProvider
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      if (params.data) {
        const data = JSON.parse(params.data);
        this.transactionId = data.id;
        if (data.id) {
          this.transactionSubscription = this.transactionService
            .getTransaction(data.id)
            .subscribe((data) => {
              console.log(data);
              this.transactionData = data;
              this.paymentStatus = data.status;
              this.amount = data.amount;
              this.command = data.type;
              this.date = data.date.toDate();
            });
        }
      }
    });
    this.activatedRoute.params.subscribe((params) => {
      console.log('params', params);
      if (params.id) {
        this.transactionId = params.id;
        this.transactionSubscription = this.transactionService
          .getTransaction(params.id)
          .subscribe((data) => {
            console.log(data);
            this.paymentStatus = data.status;
            this.amount = data.amount;
            this.command = data.type;
            this.date = data.date.toDate();
            this.transactionData = data;
          });
      }
    });
  }

  ngOnInit() {
    this.retailerId = this.dataProvider.userData.userId;
    this.retailerName = this.dataProvider.userData.displayName;
  }
  copy(text: string) {
    console.log(text);
    navigator.clipboard.writeText(text);
    this.alertify.presentToast('Copied to clipboard');
  }
}
