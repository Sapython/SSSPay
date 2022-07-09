import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-recharge-widget',
  templateUrl: './mobile-recharge-widget.component.html',
  styleUrls: ['./mobile-recharge-widget.component.scss'],
})
export class MobileRechargeWidgetComponent implements OnInit {
  @Input() name: string = '';
  @Input() image: string = '';
  @Input() number: number = null;
  @Input() operator: string = '';
  constructor() {}

  ngOnInit() {}
}
