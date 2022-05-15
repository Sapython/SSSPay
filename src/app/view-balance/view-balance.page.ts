import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.page.html',
  styleUrls: ['./view-balance.page.scss'],
})
export class ViewBalancePage implements OnInit {
  @Input() available:string = '₹80000'
  @Input() highest:string = '₹90000'
  constructor() { }

  ngOnInit() {
  }

}
