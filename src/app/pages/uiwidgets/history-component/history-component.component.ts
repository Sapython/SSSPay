import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-history-component',
  templateUrl: './history-component.component.html',
  styleUrls: ['./history-component.component.scss'],
})
export class HistoryComponentComponent implements OnInit {
  @Input() amount:number = 0
  @Input() type:string = ''
  @Input() date:Date = new Date();
  @Input() status:string = "success"
  @Input() receiver:string = 'Ranvijay Sinha'
  @Input() paymentStatus:string;
  @Input() description:string = ''
  @Input() serviceType:string = ''
  @Input() additionalNumber:number = 0;
  
  constructor() { }

  ngOnInit() {
    // this.status = 'AEPS Done to'
    // this.amount = 4500
    // this.type = 'aeps'
    // this.date = new Date()
    // this.receiver = 'Ranvijay Sinha'
    // this.paymentStatus = 'started'
    // this.description = 'AEPS Done to Ranvijay Sinha'

    // Types type:'aeps'|'cableDth'|'fastTag'|'gas'|'recharge'|'expressPayout'|'dailyPayout';
    if (this.type == 'aeps') {
      this.status = 'AEPS done to'
    } else if (this.type == 'cableDth') {
      this.status = 'DTH paid to'
    } else if (this.type == 'fastTag') {
      this.status = 'Fast Tag done to'
    } else if (this.type == 'gas') {
      this.status = 'Gas paid to'
    } else if (this.type == 'recharge') {
      this.status = 'Recharge done to'
    } else if (this.type == 'expressPayout') {
      this.status = 'Express Payout done to'
    } else if (this.type == 'dailyPayout') {
      this.status = 'Daily Payout done to'
    } else {
      this.status = 'Unknown'
    }
  }

}
