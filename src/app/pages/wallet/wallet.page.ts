import { Component, Input, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  @Input() amount: string = '';
  @Input() currency: string = '₹';
  
  public transactions = [
    {
      id: 1,
      name: 'Ranvijay Sinha',
      amount: '48,900',
      sign: '+',
      status: 'success',
      time: '11.20 PM',
      date: '22 may 2022',
      image: 'https://i.pravatar.cc/300',
      purpose: 'For Beverage',
    },
    {
      id: 2,
      name: 'Madhab Sinha',
      amount: '8,900',
      sign: '-',
      status: 'danger',
      time: '01.20 AM',
      date: '22 May 2022',
      image: 'https://i.pravatar.cc/300',
      purpose: 'Tution fees',
    },
    {
      id: 3,
      name: 'Tony Stark',
      amount: '4,900',
      sign: '+',
      status: 'success',
      time: '07.20 PM',
      date: '25 may 2022',
      image: 'https://i.pravatar.cc/300',
      purpose: 'For Party',
    },
    {
      id: 4,
      name: 'Kamala Khan',
      amount: '900',
      sign: '-',
      status: 'danger',
      time: '11.20 PM',
      date: '22 may 2022',
      image: 'https://i.pravatar.cc/300',
      purpose: 'Bill payemnt',
    },
    {
      id: 5,
      name: 'America Savage',
      amount: '8,900',
      sign: '+',
      status: 'success',
      time: '11.20 PM',
      date: '21 may 2022',
      image: 'https://i.pravatar.cc/300',
      purpose: 'salery',
    },
    {
      id: 6,
      name: 'Narendra Modi',
      amount: '4,900',
      sign: '-',
      status: 'danger',
      time: '11.20 PM',
      date: '5 April 2022',
      image: 'https://i.pravatar.cc/300',
      purpose: 'For Beverage',
    },
    {
      id: 7,
      name: 'Pritam Kumar',
      amount: '48,900',
      sign: '-',
      status: 'danger',
      time: '11.20 PM',
      date: '27 Jan 2022',
      image: 'https://i.pravatar.cc/300',
      purpose: 'For Beverage',
    },
  ];
  loading:boolean = false;
  constructor(private serverService: ServerService) {}

  async ngOnInit() {
    this.loading = true;
    this.serverService
      .getWalletBalance()
      .then((data) => {
        console.log(data);
        this.amount = data.balance;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.log('error', error);
      });
  }
}
