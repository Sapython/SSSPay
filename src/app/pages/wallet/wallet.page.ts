import { Component, Input, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { Transaction } from 'src/app/structures/method.structure';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  @Input() amount: string = '';
  @Input() currency: string = '₹';
  transactions:Transaction[] = []
 
  loading:boolean = false;
  constructor(private databaseService:DatabaseService,public dataProvider:DataProvider,private alertify:AlertsAndNotificationsService,private transactionService:TransactionService) {}

  async ngOnInit() {
    this.loading = true;
    this.dataProvider.transactions.forEach((doc:any)=>{
      if (doc['status']=='success' && doc['amount']>0){
        this.transactions.push({...doc,id:doc.id})
      }
    })
    this.dataProvider.transactionsUpdated.subscribe((docs)=>{
      this.transactions = []
      docs.forEach((doc:any)=>{
        if (doc['status']=='success' && doc['amount']>0){
          this.transactions.push({...doc,id:doc.id})
        }
      })
    })
  }

  createWallet(){
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.createWallet().then((res)=>{
      this.alertify.presentToast('Wallet created successfully');
    }).catch(()=>{
      this.alertify.presentToast('Wallet creation failed');
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }

  addMoney(){
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.addTestMoney().then((res)=>{
      this.alertify.presentToast('Money added successfully');
    }).catch(()=>{
      this.alertify.presentToast('Money addition failed');
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
    this.alertify.presentToast('You can add money using UPI and AEPS only.');
  }

  clip(text:string,length:number){
    return text.substring(0,length)
  }
}
