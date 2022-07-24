import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  @Input() time:string = '1m27s'
  @Input() billsinfo:string = 'Pay electricity, postpaid, credit card & other bills!'
  constructor() { }

  ngOnInit() {
  }

}
