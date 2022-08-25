import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { FastagService } from 'src/app/services/fastag.service';
import { LocationService } from 'src/app/services/location.service';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { PayBillPage } from '../pay-bill/pay-bill.page';

@Component({
  selector: 'app-select-operator',
  templateUrl: './select-operator.page.html',
  styleUrls: ['./select-operator.page.scss'],
})
export class SelectOperatorPage implements OnInit {
  operators: any[];

  constructor(
    private alertService: AlertsAndNotificationsService,
    private router: Router,
    private dataProvider: DataProvider,
    private locationService: LocationService,
    private serverService:ServerService,
    private transactionService:TransactionService,
    private modalController:ModalController
  ) {}

  ngOnInit() {
    this.dataProvider.pageSetting.blur = true;
    console.log('FastTagRechargePage');
    this.dataProvider.pageSetting.blur = true;
    console.log('FastTagRechargePage');
    this.serverService.getFastTagOperators().then((data:any)=>{
      console.log(data)
      this.operators = data
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }

  bankSelected(bank:any,caNumber:any){
    this.dataProvider.pageSetting.blur = true;
    this.serverService.fetchFastTagConsumerDetail(caNumber.toString(),bank.id).then(async (data:any)=>{
      console.log('fetchFastTagConsumerDetail',data)
      data['caNumber'] = caNumber
      data['bank'] = bank
      const dialog = await this.modalController.create({
        component: PayBillPage,
        componentProps:{
          billData:data,
        }
      })
      await dialog.present()
    }).catch((error)=>{
      this.alertService.presentToast(error.message)
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }
}
