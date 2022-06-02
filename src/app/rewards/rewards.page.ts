import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {
  public rewards=[
 
    {
      id:1,
      offer:'Flat Rs.1000 off on order above Rs.5000',
      Image:'../../assets/nayasa-reward.svg',
      expire:' will expire in   2 days'
    },
    {
      id:2,
      offer:'get Rs.500 off on purcahse of Rs.3000 and above',
      Image:'https://gumlet.assettype.com/swarajya%2F2021-01%2F7a6e91f6-5862-4ac5-bb08-eb5bf2a3e20c%2FboAt_logo.jpg?format=auto',
      expire:' 25 Aug 2022 11:20 PM'
    },
    {
      id:3,
      offer:'₹400 off on  NAAYASA jewellery',
      Image:'../../assets/nayasa-reward.svg',
      expire:' 25 Aug 2022 11:20 PM'
    },
    {
      id:4,
      offer:'Flat Rs.1000 off on order above Rs.5000',
      Image:'../../assets/nayasa-reward.svg',
      expire:' will expire in   2 days'
    },
    {
      id:5,
      offer:'get Rs.500 off on purcahse of Rs.3000 and above',
      Image:'https://gumlet.assettype.com/swarajya%2F2021-01%2F7a6e91f6-5862-4ac5-bb08-eb5bf2a3e20c%2FboAt_logo.jpg?format=auto',
      expire:' 25 Aug 2022 11:20 PM'
    },
    {
      id:6,
      offer:'₹400 off on NAAYASA jewellery',
      Image:'../../assets/nayasa-reward.svg',
      expire:' 25 Aug 2022 11:20 PM'
    }
    
  
  ]
  constructor() { }

  ngOnInit() {
  }

}
