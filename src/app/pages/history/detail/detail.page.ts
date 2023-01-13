import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Transaction } from 'src/app/structures/method.structure';
import { Clipboard } from '@capacitor/clipboard';


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
  transactionData: Transaction;
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
    this.activatedRoute.params.subscribe((params) => {
      console.log('params', params);
      if (params.id) {
        this.transactionId = params.id;
        this.transactionSubscription.unsubscribe();
        this.transactionSubscription = this.transactionService
          .getTransaction(params.id)
          .subscribe((data:any) => {
            // alert("Updated")
            console.log(JSON.parse(JSON.stringify(data)));
            this.paymentStatus = data.status;
            this.amount = data.amount;
            this.command = data.type;
            this.date = data.date.toDate();
            this.transactionData = data;
            this.successData = data.successData;
            if (data.type == 'expressPayout' || data.type == "dailyPayout") {
              if (data.newPayoutStatus){
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
                // this.alertify.presentToast(event)
                if (pendingStatuses.includes(event) && this.paymentStatus !='pending') {
                  this.paymentStatus = 'pending';
                  this.transactionService.updateTransaction(params.id, {
                    status: 'pending',
                  })

                } else if (successStatuses.includes(event) && this.paymentStatus !='success') {
                  this.paymentStatus = 'success';
                  this.transactionService.updateTransaction(params.id, {
                    status: 'success',
                  })
                } else if (failedStatuses.includes(event) && this.paymentStatus !='error') {
                  this.paymentStatus = 'error';
                  this.transactionService.updateTransaction(params.id, {
                    status: 'error',
                  })
                }
              }
              }
            }
          });
      }
    });
  }

  print() {
     
  }

  getPdf() {
    const doc = new jsPDF();
    // create a receipt for transaction
    doc.setFontSize(20);
    doc.text('Receipt', 100, 10);
    doc.setFontSize(12);
    doc.addImage('assets/it_logo.png','PNG',15,20,50,20);
    doc.addImage('assets/fino.jpg','PNG',80,15,50,30);
    doc.addImage('assets/icici.jpg','PNG',160,20,25,20);
    doc.line(10, 50, 200, 50);
    doc.text('Retailer Name: ' + this.retailerName, 10, 80);
    doc.text('Retailer Id: ' + this.retailerId, 10, 70);
    doc.text('Date: ' + this.date, 10, 90);
    doc.text('Amount: ' + this.amount, 10, 100);
    doc.text('Transaction Id: ' + this.transactionId, 10, 110);
    doc.text('Payment Status: ' + this.paymentStatus, 10, 120);
    if(this.transactionData?.extraData?.aepsData){
      if(this.transactionData.extraData.aepsData.transactionType == 'MS'){
        doc.text('Type: ' + "AEPS Mini Statement", 10, 130);
      } else if(this.transactionData.extraData.aepsData.transactionType == 'BE'){
        doc.text('Type: ' + "AEPS Balance Enquiry", 10, 130);
      } else if(this.transactionData.extraData.aepsData.transactionType == 'CW'){
        doc.text('Type: ' + "AEPS Cash Withdrawal", 10, 130);
      } else if(this.transactionData.extraData.aepsData.transactionType == 'M'){
        doc.text('Type: ' + "AEPS Aadhaar Pay", 10, 130);
      }
    } else {
      doc.text('Type: ' + this.command, 10, 130);
    }
    if (this.successData && this.transactionData.type == 'aeps'){
      doc.text('Balance: ' + this.successData.balanceamount, 10, 140);
      doc.text('Bank iin: ' + this.successData.bankiin, 10, 150);
      doc.text('Bank RRN: ' + this.successData.bankrrn, 10, 160);
      doc.text('Aadhaar: ********' + this.successData.last_aadhar, 10, 170);
      doc.text('Mobile No: ' + this.successData.balanceamount, 10, 170);
      doc.text('Reference No: ********' + this.successData.clientrefno, 10, 170);
    }
    
    if(this.transactionData && this.transactionData.successData && this.transactionData.type == 'recharge'){
      doc.text('Acknowledgement No: ' + this.transactionData.successData.ackno, 10, 140);
      doc.text('Operator Id: ' + this.transactionData.successData.operatorid, 10, 150);
      doc.text('Circle: ' + this.transactionData.extraData.circle, 10, 160);
      doc.text('Plan: ' + this.transactionData.extraData.plan.desc, 10, 170);
    }
    doc.save('a4.pdf');
  }

  ngOnInit() {
    this.retailerId = this.dataProvider.userData.userId;
    this.retailerName = this.dataProvider.userData.displayName;
    // setTimeout(() => {
    //   // window.print();
    //   // print()
    //   alert('Printed');
    // }, 3000);
  }
  
  async copy(text: string) {
    navigator.clipboard.writeText(text);
    await Clipboard.write({string: text});
    this.alertify.presentToast('Copied to clipboard');
  }

  // generate random id
  generateId() {
    return Math.floor(Math.random() * 10000000);
  }

  clip(text:string){
    // clip text to 15 characters
    if(text.length > 10){
      return text.substring(0,15) + '...'
    }else{
      return text
    }
  }
}
