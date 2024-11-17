import { Component, OnInit } from '@angular/core';

import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-signup-not-allowed',
  templateUrl: './signup-not-allowed.page.html',
  styleUrls: ['./signup-not-allowed.page.scss'],
})
export class SignupNotAllowedPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async openWhatsapp(){
    await Browser.open({ url: "https://wa.me/+919026269080?text=Hey%20there.%20I%20want%20to%20signup%20on%20SSSPay." });
  }
}
