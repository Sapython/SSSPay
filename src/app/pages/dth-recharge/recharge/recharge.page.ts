import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { Transaction } from 'src/app/structures/method.structure';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {
  @Input() rechargeData:any;
  @Input() formData:any;
  constructor(public dataProvider: DataProvider,private transactionService:TransactionService,private serverService:ServerService,private router:Router,private modalController:ModalController,private alertify:AlertsAndNotificationsService) { }
  activeId:string = '';
  recharges:any[] = []
  isModalOpen = false;
  ngOnInit() {
    console.log(this.rechargeData);
    this.rechargeData.info.forEach((element:any) => {
      let plans:any[] = []
      console.log(element.planname.split(','));
      element.planname.split(',').forEach((plan:any) => {
        if (!plan.trim().startsWith('End')){
          plans.push({
            title:plan.trim().split('Rs')[0],
            price:Number(plan.trim().split('Rs ')[1])
          })
        }
      })
      this.recharges.push({...element,plans:plans,id:this.generateRandomId()})
      console.log(this.recharges);
    });
    console.log("recharges",this.recharges);
  }

  generateRandomId(){
    return Math.floor(Math.random() * 1000000);
  }
  recharge(rechargePlan:any){
    console.log(rechargePlan);
    const transaction:Transaction = {
      ownerId:this.dataProvider.userData?.ownerId || null,
      serviceType:'dth',
      amount: Number(rechargePlan.MonthlyRecharge),
      date: new Date(),
      type:'cableDth',
      description: 'DTH: Payment done for '+rechargePlan.MonthlyRecharge,
      balance: this.dataProvider.wallet.balance,
      idempotencyKey: this.generateIdemPotencyKey(),
      completed: false,
      status: 'started',
      error: null,
      receiver:rechargePlan.customerName,
      extraData: {
        ...this.formData,
        customerId: this.dataProvider.userData.userId,
      },
      userId: this.dataProvider.userData.userId,
    }
    this.dataProvider.pageSetting.blur = true;
    this.transactionService.addTransaction(transaction).then(async (docRef) => {
      console.log('transactionAdded',docRef.id,docRef);
      this.serverService.recharge(docRef.id).then((response:any) => {
        this.dataProvider.pageSetting.blur = true;
        console.log('response From recharge',response);
        this.modalController.dismiss()
        this.router.navigate(['../../history/detail/'+docRef.id]);
      }).catch((err) => {
        console.log(err);
        this.alertify.presentToast('Something went wrong','error');
      }).finally(() => {
        this.dataProvider.pageSetting.blur = false;
      })
    }).catch((err) => {
      this.dataProvider.pageSetting.blur = false;
    });
  }

  // generateIdemPotencyKey
  generateIdemPotencyKey() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
