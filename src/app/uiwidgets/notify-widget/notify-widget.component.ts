import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notify-widget',
  templateUrl: './notify-widget.component.html',
  styleUrls: ['./notify-widget.component.scss'],
})
export class NotifyWidgetComponent implements OnInit {
  @Input() time:string = '1m27s'
  @Input() billsinfo:string = 'Pay electricity, postpaid, credit card & other bills!'
  constructor() { }

  ngOnInit() {}

}
