import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() page: string = '';
  @ViewChild('cam') camera: any;
  
  constructor(private platform: Platform, private route: Router) {}

  ngOnInit() {}

  goBack() {
    window.history.back();
  }

  scanQRCode() {
    // alert('Opening qr scanner')
    if (this.platform.is('capacitor')) {
    } else {
      // this.camera.click()
    }
  }
}
