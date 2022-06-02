import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fast-tag-recharge',
  templateUrl: './fast-tag-recharge.page.html',
  styleUrls: ['./fast-tag-recharge.page.scss'],
})
export class FastTagRechargePage implements OnInit {
public banks=[
  {
    id:1,
    name:'Axic bank Fastag',
    Image:'../../../assets/banks/axisbank.svg'
  },
  {
    id:2,
    name:'Bank of Baroda',
    Image:'../../../assets/banks/BOB.svg'
  },
  {
    id:3,
    name:'HDFC Bank',
    Image:'../../../assets/banks/hdfc.svg'
  },
  {
    id:4,
    name:'State Bank Of India',
    Image:'../../../assets/banks/sbi.svg'
  },
  {
    id:5,
    name:'UCO Bank',
    Image:'https://www.logotaglines.com/wp-content/uploads/2016/08/UCO-Bank-Logo.jpg'
  },
  {
    id:6,
    name:'Syndicate Bank',
    Image:'https://www.logotaglines.com/wp-content/uploads/2016/08/Syndicate-Bank-Loog.png'
  },
  {
    id:7,
    name:'Punjab National Bank ',
    Image:'https://static.toiimg.com/photo/msid-74887573/74887573.jpg'
  },
  {
    id:8,
    name:'Canara Bank',
    Image:'https://www.logotaglines.com/wp-content/uploads/2016/08/wp-1470410546498.jpg'
  }

]
  constructor() { }

  ngOnInit() {
  }

}



// <app-bank-widget class="ion-text-center" [name]="'ICICI bank'" [image]="'../../../assets/banks/icici.svg'" routerLink="../payment-status"></app-bank-widget>
// <app-bank-widget class="ion-text-center" [name]="'Bank of Boroda'" [image]="'../../../assets/banks/BOB.svg'" routerLink="../payment-status"></app-bank-widget>
// <app-bank-widget class="ion-text-center" [name]="'HDFC Bank - Fastag'" [image]="'../../../assets/banks/hdfc.svg'"></app-bank-widget>
// <app-bank-widget class="ion-text-center" [name]="'State bank of india'" [image]="'../../../assets/banks/sbi.svg'"></app-bank-widget>
// <app-bank-widget class="ion-text-center" [name]="'kanad bank'" [image]="'../../../assets/banks/icici.svg'"></app-bank-widget>
// <app-bank-widget class="ion-text-center" [name]="'HDFC Bank - Fastag'" [image]="'../../../assets/banks/hdfc.svg'"></app-bank-widget>
// <app-bank-widget class="ion-text-center" [name]="'State bank of india'" [image]="'../../../assets/banks/sbi.svg'"></app-bank-widget>
// <app-bank-widget class="ion-text-center" [name]="'kanad bank'" [image]="'../../../assets/banks/icici.svg'"></app-bank-widget>