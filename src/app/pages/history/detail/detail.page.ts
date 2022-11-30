import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
  transactionData: any;
  date: Date = new Date();
  transactionSubscription: Subscription = Subscription.EMPTY;
  retailerId: string = '';
  retailerName: string = '';
  successData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private alertify: AlertsAndNotificationsService,
    private transactionService: TransactionService,
    private dataProvider: DataProvider,
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      if (params.data) {
        const data = JSON.parse(params.data);
        this.transactionId = data.id;
        if (data.id) {
          this.transactionSubscription.unsubscribe();
          this.transactionSubscription = this.transactionService
            .getTransaction(data.id)
            .subscribe((data) => {
              console.log(data);
              this.transactionData = data;
              this.paymentStatus = data.status;
              this.amount = data.amount;
              this.command = data.type;
              this.date = data.date.toDate();
              this.successData = data.successData;
              alert('updated');
              if (data.type == 'expressPayout') {
                if (data.newPayoutStatus) {
                  alert(data.newPayOutStatus.event);
                  let pendingStatuses = [
                    'payout.pending',
                    'payout.queued',
                    'payout.initiated',
                  ];
                  let successStatuses = ['payout.processed'];
                  let failedStatuses = [
                    'payout.failed',
                    'payout.reversed',
                    'payout.rejected',
                  ];
                  if (pendingStatuses.includes(data.newPayOutStatus.event)) {
                    this.paymentStatus = 'pending';
                  } else if (
                    successStatuses.includes(data.newPayOutStatus.event)
                  ) {
                    this.paymentStatus = 'success';
                  } else if (
                    failedStatuses.includes(data.newPayOutStatus.event)
                  ) {
                    this.paymentStatus = 'error';
                  }
                }
              }
            });
        }
      }
    });
    this.activatedRoute.params.subscribe((params) => {
      console.log('params', params);
      if (params.id) {
        this.transactionId = params.id;
        this.transactionSubscription.unsubscribe();
        this.transactionSubscription = this.transactionService
          .getTransaction(params.id)
          .subscribe((data) => {
            console.log(JSON.parse(JSON.stringify(data)));
            this.paymentStatus = data.status;
            this.amount = data.amount;
            this.command = data.type;
            this.date = data.date.toDate();
            this.transactionData = data;
            this.successData = data.successData;
            if (data.type == 'expressPayout') {
              let event = '';
              try {
                event = data.newPayoutStatus['event'];
              } catch (error) {
                event = data.newPayoutStatus.event;
              }
              console.log(
                data.newPayoutStatus,
                event,
                data.newPayoutStatus != undefined
              );
              if (data.newPayoutStatus != undefined) {
                let pendingStatuses = [
                  'payout.pending',
                  'payout.queued',
                  'payout.initiated',
                ];
                let successStatuses = ['payout.processed'];
                let failedStatuses = [
                  'payout.failed',
                  'payout.reversed',
                  'payout.rejected',
                ];
                if (pendingStatuses.includes(event)) {
                  this.paymentStatus = 'pending';
                } else if (successStatuses.includes(event)) {
                  this.paymentStatus = 'success';
                } else if (failedStatuses.includes(event)) {
                  this.paymentStatus = 'error';
                }
              }
            }
          });
      }
    });
  }

  print() {
    
  }

  getPdf() {}

  ngOnInit() {
    this.retailerId = this.dataProvider.userData.userId;
    this.retailerName = this.dataProvider.userData.displayName;
    setTimeout(() => {
      window.print();
      print()
      alert('Printed');
    }, 3000);
  }
  copy(text: string) {
    console.log(text);
    navigator.clipboard.writeText(text);
    this.alertify.presentToast('Copied to clipboard');
  }

  // generate random id
  generateId() {
    return Math.floor(Math.random() * 10000000);
  }
}
