import { Component, OnInit } from '@angular/core';
import { UpiService } from '../services/upi.service';

@Component({
  selector: 'app-upi-pin',
  templateUrl: './upi-pin.page.html',
  styleUrls: ['./upi-pin.page.scss'],
})
export class UpiPinPage implements OnInit {
  bankname: string = 'State Bank Of India';
  accountNumber: string = 'XXXX XXXX 4256';
  amount: number;

  constructor(private upiService: UpiService) {
    this.amount = this.upiService.details.amount;
  }

  ngOnInit() {}

  pay() {
    const boxes = document.getElementsByClassName('upi-box');
    var pin = '';
    for (let i = 0; i < boxes.length; i++) {
      pin += (boxes[i] as HTMLInputElement).value;
    }
    
    // send 'pin' and upiservice.details to backend
    // depending upon upiservice.details.paymentFor add db records
  }
}
