import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  ngOnInit() {}
  items = [
    {
      name: 'AEPS Services',
      service: 'service',
      page: 'aeps',
    },
    {
      name: 'Bank Transfer',
      service: 'bank',
      page: 'aeps',
    },
    {
      name: 'Pay Your Bills',
      service: 'bills',
      page: 'aeps',
    },
    {
      name: 'Verify PAN ID',
      service: 'PAN',
      page: 'aeps',
    },
  ];
}
