import { Component, OnInit } from '@angular/core';
import { UpiService } from '../../services/upi.service';

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.page.html',
  styleUrls: ['./transaction-status.page.scss'],
})
export class TransactionStatusPage implements OnInit {

  amount: number;
  paymnetStatus:boolean=  true;
  constructor(private upiService: UpiService) {
    this.amount = this.upiService.details.amount;
  }


  ngOnInit() {
  }

}
