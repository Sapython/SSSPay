import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  public offers=[
   
    {
      id:1,
      offer:'Flat Rs.1000 off on order above Rs.5000',
      Image:'../../assets/nayasa-reward.svg'
    },
    {
      id:2,
      offer:'get Rs.500 off on purcahse of Rs.3000 and above',
      Image:'https://gumlet.assettype.com/swarajya%2F2021-01%2F7a6e91f6-5862-4ac5-bb08-eb5bf2a3e20c%2FboAt_logo.jpg?format=auto'
    },
    {
      id:3,
      offer:'HDFC Bank',
      Image:'../../../assets/banks/hdfc.svg'
    },
    {
      id:4,
      offer:'State Bank Of India',
      Image:'../../../assets/banks/sbi.svg'
    },
    {
      id:5,
      offer:'UCO Bank',
      Image:'https://www.logotaglines.com/wp-content/uploads/2016/08/UCO-Bank-Logo.jpg'
    },
    {
      id:6,
      offer:'Syndicate Bank',
      Image:'https://www.logotaglines.com/wp-content/uploads/2016/08/Syndicate-Bank-Loog.png'
    },
    {
      id:7,
      offer:'Punjab National Bank ',
      Image:'https://static.toiimg.com/photo/msid-74887573/74887573.jpg'
    },
    {
      id:8,
      offer:'Canara Bank',
      Image:'https://www.logotaglines.com/wp-content/uploads/2016/08/wp-1470410546498.jpg'
    }
  
  ]
  constructor() { }

  ngOnInit() {
  }

}
