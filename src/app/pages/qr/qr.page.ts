import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { Transaction } from 'src/app/structures/method.structure';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {
  amount:number=0;
  constructor(public dataProvider:DataProvider,private serverService:ServerService,private alertify:AlertsAndNotificationsService,private transactionService:TransactionService) { }

  ngOnInit() {
  }

  registerQrCode(){
    if (this.amount > 0) {
      const data:Transaction = {
        amount: this.amount,
        groupId:this.dataProvider.userData?.groupId || null,
        serviceType:'other',
        receiver: this.dataProvider.userData.displayName,
        date: new Date(),
        type: 'qr',
        description: 'QR Code',
        balance:this.dataProvider.wallet.balance,
        completed:false,
        status:'pending',
        error:null,
        extraData:{
          customerName:this.dataProvider.userData.displayName,
          customerEmail:this.dataProvider.userData.email,
          customerMobile:this.dataProvider.userData.phoneNumber
        }
      }
      this.transactionService.addTransaction(data).then((doc)=>{
        console.log('Transaction added',doc.id);
        this.serverService.createUpiPaymentQr(doc.id).then((response)=>{
          console.log('QR Code Created',response);
        }).catch((error:any)=>{
          console.log('QR Code Creation Failed',error);
        })
      })
    } else {
      this.alertify.presentToast('Please enter a valid amount','error');
    }
  }
}
