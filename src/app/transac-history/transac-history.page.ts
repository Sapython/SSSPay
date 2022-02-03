import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transac-history',
  templateUrl: './transac-history.page.html',
  styleUrls: ['./transac-history.page.scss'],
})
export class TransacHistoryPage implements OnInit {
  @Input() id:string = '12345678910'
  @Input() amount:string = '2324'
  @Input() name:string = 'Kumar Saptam'
  @Input() status:string = 'Recieved'
  @Input() date:string = '12*-02-2021'
  constructor() { }

  ngOnInit() {
  }

}
