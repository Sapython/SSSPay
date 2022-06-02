import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-widget',
  templateUrl: './transaction-widget.component.html',
  styleUrls: ['./transaction-widget.component.scss'],
})
export class TransactionWidgetComponent implements OnInit {
  @Input() amount:string = '48,900'
   @Input() image:string = '"https://i.pravatar.cc/300"'
  @Input() currency:string = '₹'
  @Input() sign:string = '+'
  @Input() time:string = '1m 3s ago'
  @Input() purpose:string = 'For Beverages'
  @Input() name:string = 'Ranvijay Sinha'
  @Input() status:string = "success"
  //for credit amount "success" for debit amount "danger"
  constructor() { }

  ngOnInit() {}

}
