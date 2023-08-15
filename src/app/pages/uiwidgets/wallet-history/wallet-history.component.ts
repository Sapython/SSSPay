import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Clipboard } from '@capacitor/clipboard';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';


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
  
  serviceText:string;
  
  constructor(private alertify:AlertsAndNotificationsService) { }

  ngOnInit() {
    this.serviceText = this.transformText(this.service);
    // clip transaction id to 8 chars
    this.transactionId = this.transactionId.substring(0,15)+'...';
  }

  transformText(text:string){
    return text.replace('_',' ');
  }

  async copyToClipboard(text:string){
    await Clipboard.write({
      string: text
    });
    this.alertify.presentToast('Copied to clipboard');
  }

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