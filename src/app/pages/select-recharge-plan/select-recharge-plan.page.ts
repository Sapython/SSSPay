import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-recharge-plan',
  templateUrl: './select-recharge-plan.page.html',
  styleUrls: ['./select-recharge-plan.page.scss'],
})
export class SelectRechargePlanPage implements OnInit {
  @Input() name: string = 'Arther Harrow';
  @Input() image: string = 'https://i.pravatar.cc/300';
  @Input() number: number = 256365214;
  @Input() operator: string = 'airtel';
  searchVall: string;
  public plans = {
    all: [
      {
        id: 1,
        amount: 3359,
        validity: 365,
        data: 3,
        calls: 'Unliimited',
      },
      {
        id: 2,
        amount: 1200,
        validity: 180,
        data: 2,
        calls: 'Unliimited',
      },
      {
        id: 3,
        amount: 800,
        validity: 120,
        data: 1.5,
        calls: 'Unliimited',
      }, {
        id: 4,
        amount: 500,
        validity: 58,
        data: 1.5,
        calls: 'Unliimited',
      },
      {
        id: 5,
        amount: 439,
        validity: 58,
        data: 1,
        calls: 'Unliimited',
      }, {
        id: 6,
        amount: 500,
        validity: 58,
        data: 1.5,
        calls: 'Unliimited',
      },
      {
        id: 7,
        amount: 439,
        validity: 58,
        data: 1,
        calls: 'Unliimited',
      },
    ],
    data: [
      {
        id: 4,
        amount: 500,
        validity: 58,
        data: 1.5,
        calls: 'Unliimited',
      },
      {
        id: 5,
        amount: 439,
        validity: 58,
        data: 1,
        calls: 'Unliimited',
      },
    ],
    unlimited: [
      {
        id: 4,
        amount: 400,
        validity: 58,
        data: 1.5,
        calls: 'Unliimited',
      },
      {
        id: 5,
        amount: 439,
        validity: 58,
        data: 1,
        calls: 'Unliimited',
      },
    ],
    international: [
       {
      id: 5,
      amount: 639,
      validity: 58,
      data: 1,
      calls: 'Unliimited',
    },
      {
        id: 4,
        amount: 600,
        validity: 58,
        data: 1.5,
        calls: 'Unliimited',
      },
      {
        id: 5,
        amount: 439,
        validity: 58,
        data: 1,
        calls: 'Unliimited',
      },
    ],
    smart: [
      {
        id: 4,
        amount: 700,
        validity: 58,
        data: 1.5,
        calls: 'Unliimited',
      },
      {
        id: 5,
        amount: 789,
        validity: 58,
        data: 1,
        calls: 'Unliimited',
      },
      {
        id: 5,
        amount: 439,
        validity: 58,
        data: 1,
        calls: 'Unliimited',
      },
    ],
    talktime: [
      {
        id: 5,
        amount: 439,
        validity: 58,
        data: 1,
        calls: 'Unliimited',
      },
      {
        id: 4,
        amount: 800,
        validity: 58,
        data: 1.5,
        calls: 'Unliimited',
      },
      {
        id: 5,
        amount: 439,
        validity: 58,
        data: 1,
        calls: 'Unliimited',
      },
    ]
  };
pack=0;
  showPlans = false;
  active = false;
  togglePlans() {
    this.showPlans = this.showPlans=true;
  }
  toggleActive() {
    this.active = !this.active;
  }
  constructor() {}

  ngOnInit() {}
}
