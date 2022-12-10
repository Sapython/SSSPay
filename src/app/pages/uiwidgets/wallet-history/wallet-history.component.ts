import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.scss'],
})
export class WalletHistoryComponent implements OnInit {
  @Input() statement:string;
  @Input() date:Date;
  @Input() money:number;
  @Input() type:'credit'|'debit' = 'credit';
  @Input() service:string;
  constructor() { }

  ngOnInit() {}

}
