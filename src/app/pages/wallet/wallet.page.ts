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
  filteredCommissions:any[] = []
  currentSelectedType:string = 'all';
  commissions:any[] = []
  services:{name:string,code:string}[] = []
  loading:boolean = false;
  constructor(private databaseService:DatabaseService,public dataProvider:DataProvider,private alertify:AlertsAndNotificationsService,private transactionService:TransactionService) {}

  async ngOnInit() {
    this.loading = true;
    this.databaseService.getWalletNarration().then((data)=>{
      this.commissions = []
      data.forEach((doc:any)=>{
        this.commissions.push({...doc.data(),id:doc.id})
      });
      // categorize commissions on the basis of service
      this.services = []
      this.commissions.forEach((commission)=>{
        if(!this.services.find((service)=>service.code == commission.service)){
          this.services.push({name:commission.service.replace('_',' '),code:commission.service})
        }
      })
      this.services.unshift({name:'All',code:'all'})
      this.currentSelectedType = 'all';
      this.filteredCommissions = this.commissions;
      this.loading = false;
    }).catch((err)=>{
      this.loading = false;
    })
  }

  switchTab(event:any){
    console.log(event);
    this.currentSelectedType = event.detail.value;
    if(this.currentSelectedType == 'all'){
      this.filteredCommissions = this.commissions;
    }else{
      this.filteredCommissions = this.commissions.filter((commission)=>commission.service == this.currentSelectedType);
    }
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
  
  clip(text:string,length:number){
    return text.substring(0,length)
  }
}
