import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('cam') camera:any;
  constructor(private platform:Platform) {
  }

  ngOnInit() {}
  scanQRCode(){
    // alert('Opening qr scanner')
    if(this.platform.is('capacitor')){
    } else {
      // this.camera.click()
    }
  }
}
