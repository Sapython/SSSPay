import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataProvider } from '../../providers/data.provider';
import { BalanceComponent } from './balance/balance.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage{
  constructor(public dataProvider:DataProvider,private popoverController:PopoverController){}
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
  async openBalance(){
    const popOver = await this.popoverController.create({
      component:BalanceComponent,
      cssClass:'balance-popover',
    })
    await popOver.present();
  }    
}
