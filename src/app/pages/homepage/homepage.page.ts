import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { Transaction } from 'src/app/structures/method.structure';
import { DataProvider } from '../../providers/data.provider';
import { BalanceComponent } from './balance/balance.component';
import { Browser } from '@capacitor/browser';
import { WaitForQrPaymentComponent } from 'src/app/wait-for-qr-payment/wait-for-qr-payment.component';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage{
  @ViewChild('webRef') webRef;
  constructor(public dataProvider:DataProvider,private popoverController:PopoverController,private serverService:ServerService,private transactionService:TransactionService,private alertify:AlertsAndNotificationsService,private databaseService:DatabaseService){}
  items = [
    {
      name: 'AEPS Services',
      service: 'service',
      page: 'aeps',
      routerLink:'/aeps'
    },
    {
      name: 'Payout',
      service: 'bank',
      page: 'aeps',
      routerLink:'/payout'
    },
    // {
    //   name: 'Pay Your Bills',
    //   service: 'bills',
    //   page: 'aeps',
      
    //   routerLink:'/mobile-recharge'
    // },
    {
      name: 'Onboarding',
      service: 'PAN',
      page: 'aeps',
      
      routerLink:'/onboarding'
    },
  ];
  webLink:string = '';
  upiQrId:string;
  async openBalance(){
    const popOver = await this.popoverController.create({
      component:BalanceComponent,
      cssClass:'balance-popover',
    })
    await popOver.present();
  }
  recheckPaymentStatus(){
    if (this.upiQrId){}
    this.dataProvider.pageSetting.blur = true;
    this.serverService.recheckPaymentStatus(this.upiQrId).then((res)=>{
      alert("Recheck response success");
      console.log(res);
    }).catch((err)=>{
      alert("Recheck response error");
      console.log(err);
      console.error(err);
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }
  payUpiMoney(){
    const transactionData:Transaction = {
      amount:1,
      balance:this.dataProvider.wallet.balance,
      completed:false,
      date:new Date(),
      description:'UPI Payment for kyc verification.',
      error:null,
      extraData:{
        customerEmail:this.dataProvider.userData.email,
        customerName:this.dataProvider.userData.displayName,
        customerMobile:this.dataProvider.userData.phoneNumber,
      },
      receiver:'SSSPay',
      status:'started',
      type:'qr',
      title:'UPI KYC Payment',
    }
    this.dataProvider.pageSetting.blur = true;
    this.transactionService.addTransaction(transactionData).then((transactionRes)=>{
      this.serverService.createUpiPaymentQr(transactionRes.id).then(async (qr)=>{
        console.log(qr);
        this.alertify.presentToast('Please scan the QR code to pay the amount.','info',3000);
        alert(transactionRes.id)
        const popOver = await this.popoverController.create({
          component:WaitForQrPaymentComponent,
          componentProps:{
            amount:transactionData.amount,
            message:'Please scan the QR code to pay the amount.',
          },
          dismissOnSelect:false,
          alignment:'center',
          animated:true,
          backdropDismiss:false,
        })
        await popOver.present();
        await Browser.open({ url: qr.data.payment_url});
        const transactionSubscription = this.transactionService.getTransactionListener(transactionRes.id).subscribe((transaction:any)=>{
          alert('Updated')
          console.log("Updated",transaction.data());
          this.upiQrId = transactionRes.id
          if(transaction.data().completed && transaction.data().error==null){
            alert('Is successful')
            this.dataProvider.pageSetting.blur = false;
            transactionSubscription.unsubscribe();
            popOver.dismiss();
            this.databaseService.updateUserData({
              kycMoneyPaid:true,
            })
            this.alertify.presentToast('KYC payment completed successfully.','info',3000);
          } else if (transaction.data().error){
            alert('Found error')
            this.dataProvider.pageSetting.blur = false;
            transactionSubscription.unsubscribe();
            popOver.dismiss();
            this.alertify.presentToast('KYC payment failed.'+transaction.data().error.message,'error',3000);
          }
        })
      }).catch((err)=>{
        console.error(err);
      });
    }).catch((err)=>{
      this.alertify.presentToast('Something went wrong, please try again later.');
    }).finally(()=>{
    this.dataProvider.pageSetting.blur = false;
    })
  }

  generateLinkAndRedirectOnboarding(){
    this.dataProvider.pageSetting.blur  = true;
    this.serverService.onboardingForAepsKyc().then((data)=>{
      console.log(data);
      // Browser.open({ url: data.data.onboarding_url});
      this.webLink = data.redirecturl;
      if(this.webRef){
        console.log("webRef",this.webRef);
        this.webRef.nativeElement.href = this.webLink;
        this.webRef.nativeElement.click()
      }
    }).catch((error)=>{
      console.log(error);
      this.alertify.presentToast('Something went wrong, please try again later.');
    }).finally(()=>{
      this.dataProvider.pageSetting.blur  = false;
    })
  }
}

