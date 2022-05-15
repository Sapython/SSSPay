import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upi-pin',
  templateUrl: './upi-pin.page.html',
  styleUrls: ['./upi-pin.page.scss'],
})
export class UpiPinPage implements OnInit {
  @Input() bankname:string = 'State Bank Of India'
  @Input() cardnumber:string = 'XXXX XX4256'
  @Input() amount:string = '₹80000'
  constructor() { }

  ngOnInit() {
  }

}
