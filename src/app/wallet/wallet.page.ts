import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  @Input() amount:string = '232456'
  constructor() { }

  ngOnInit() {
  }

}
