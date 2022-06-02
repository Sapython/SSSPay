import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.page.html',
  styleUrls: ['./view-balance.page.scss'],
})
export class ViewBalancePage implements OnInit {
  @Input() name:string = 'John doe'
  @Input() number:string = '+91-111-222-11'
  @Input() email:string = 'test@gmail.com'
  @Input() available:string = '₹80000'
  @Input() highest:string = '₹90000'
  constructor() { }

  ngOnInit() {
  }

}
