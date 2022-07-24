import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../../providers/data.provider';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage{
  constructor(public dataProvider:DataProvider){}
  items = [
    {
      name: 'AEPS Services',
      service: 'service',
      page: 'aeps',
      routerLink:'/aeps'
    },
    {
      name: 'Bank Transfer',
      service: 'bank',
      page: 'aeps',
      
      routerLink:'/bank-transfer'
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
  
}
