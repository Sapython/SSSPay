import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  @Input() amount:string = '2,32,456.555'
  constructor(public modalSevices:ModalService) { }

  ngOnInit() {
  }

}
