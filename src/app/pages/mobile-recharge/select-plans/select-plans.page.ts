import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { Transaction } from 'src/app/structures/method.structure';

@Component({
  selector: 'app-select-plans',
  templateUrl: './select-plans.page.html',
  styleUrls: ['./select-plans.page.scss'],
})
export class SelectPlansPage implements OnInit {
  @Input() circle: string;
  @Input() operator: string;
  @Input() mobileNumber: string;
  @Input() operatorsId:string;
  selectedPlan: any[] = [];
  plansName: any[] = []
  plans: any[] = [];
  constructor(
    public modalController: ModalController,
    private alertify: AlertsAndNotificationsService,
    private serverService: ServerService,
    private dataProvider: DataProvider,
    private transactionsService: TransactionService,
    private router:Router
  ) {}

  ngOnInit() {
    console.log("this.circle",this.circle, this.operator);
    this.dataProvider.pageSetting.blur = true;
    this.serverService
      .getMobilePlans(this.circle, this.operator)
      .then((data: any) => {       
        this.plansName = Object.keys(data.info);
        this.plans = data.info;
        // filter out empty plans
        this.plansName = this.plansName.filter((plan) => {
          return this.plans[plan] != null;
        });
        this.selectedPlan = this.plans[this.plansName[0]];
      })
      .finally(() => {
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Plans loaded successfully');
      });
  }

  segmentChanged(event: any) {
    this.selectedPlan = this.plans[event.detail.value];    
  }

  continueRecharge(plan:any){
    if (confirm('Are you sure you want to recharge?')) {
      const transaction:Transaction = {
        title:'Mobile recharge of Rs. '+plan.rs + ' for validity' + plan.validity,
        date:new Date(),
        type:'recharge',
        amount:Number(plan.rs),
        description:'Mobile recharge of Rs. '+plan.rs + ' for validity' + plan.validity + ' with '+ plan.desc,
        balance:this.dataProvider.wallet.balance,
        status:'started',
        error:null,
        extraData:{
          circle:this.circle,
          operator:Number(this.operatorsId),
          plan:plan,
          caNumber:this.mobileNumber,
          customerId: this.dataProvider.userData.userId,
        },
        completed:false,
        idempotencyKey:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        receiver:this.mobileNumber,        
      }
      this.dataProvider.pageSetting.blur = true;
      this.transactionsService.addTransaction(transaction).then((transaction:any)=>{
        this.serverService.rechargeMobile(transaction.id).then((data:any)=>{
          if (data.response_code == 1){
            this.alertify.presentToast('Recharge successful');
            this.modalController.dismiss()
            this.router.navigate(['../../history/detail/'+transaction.id]);
          } else {
            this.alertify.presentToast('Recharge failed');
          }
        }).catch((error:any)=>{
          this.alertify.presentToast('Error while recharging');
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        })
      }).catch(()=>{
        this.alertify.presentToast('Error while recharging');
        this.dataProvider.pageSetting.blur = false;
      });
    }
  }
}
