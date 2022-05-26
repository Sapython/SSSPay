import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-widget',
  templateUrl: './transaction-widget.component.html',
  styleUrls: ['./transaction-widget.component.scss'],
})
export class TransactionWidgetComponent implements OnInit {
  @Input() amount:string = '$48'
  @Input() sign:string = '+'
  @Input() time:string = '1m 3s ago'
  @Input() purpose:string = 'For Beverages'
  @Input() name:string = 'Ranvijay Sinha'
  constructor() { }

  ngOnInit() {}

}
