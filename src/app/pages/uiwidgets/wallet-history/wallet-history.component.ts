import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.scss'],
})
export class WalletHistoryComponent implements OnInit {
  @Input() narration:string;
  @Input() transactionTime:Date;
  @Input() amount:number;
  @Input() type:'credit'|'debit' = 'credit';
  @Input() service:string;
  @Input() balance:number;
  @Input() transactionId:string;
  @Input() actionType:'TDS'|'Commission'|'Transaction-Credit'|'Transaction-Debit'|'Transaction-Refund';
  constructor() { }

  ngOnInit() {}

}
type WalletNarration = {
  amount: number;
  narration: string;
  service: string;
  balance: number;
  transactionType: 'credit' | 'debit';
  transactionId: string;
  transactionTime: Timestamp;
  actionType: 'TDS' | 'Commission' | 'Transaction-Credit' | 'Transaction-Debit' | 'Transaction-Refund'|'Direct-Debit'|'Direct-Credit';
}