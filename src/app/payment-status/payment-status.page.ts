import { Component, OnInit } from '@angular/core';
import { UpiService } from '../services/upi.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.page.html',
  styleUrls: ['./payment-status.page.scss'],
})
export class PaymentStatusPage implements OnInit {
  amount: number;
  paymnetStatus:boolean=  false;
  constructor(private upiService: UpiService) {
    this.amount = this.upiService.details.amount;
  }

  ngOnInit() {}
}
