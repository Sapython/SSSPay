import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wait-for-qr-payment',
  templateUrl: './wait-for-qr-payment.component.html',
  styleUrls: ['./wait-for-qr-payment.component.scss'],
})
export class WaitForQrPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  @Input() amount:number;
  @Input() message:string;
  @Input() function:any;
}
