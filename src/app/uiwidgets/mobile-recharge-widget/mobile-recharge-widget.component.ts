import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-recharge-widget',
  templateUrl: './mobile-recharge-widget.component.html',
  styleUrls: ['./mobile-recharge-widget.component.scss'],
})
export class MobileRechargeWidgetComponent implements OnInit {
  @Input() name:string = 'Kumar Saptam'
  @Input() number:number = 91256365214;
  @Input() operator:string = 'airtel';
  constructor() { }

  ngOnInit() {}

}
