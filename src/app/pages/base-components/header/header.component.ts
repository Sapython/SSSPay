import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() pageName: string = '';
  @Input() backUrl: string = '';
  @Input() backButton:boolean = false;
  @Input() onlyTitle:boolean = false;
  @Input() isModal:boolean = false;
  @Input() backButtonAction:any;
  @Output() back:EventEmitter<any> = new EventEmitter();
  @ViewChild('cam') camera: any;
  access = [
    'admin',
    'superDistributor',
    'masterDistributor',
    'distributor'
  ];
  constructor(private platform: Platform, private route: Router,public dataProvider:DataProvider,private navController: NavController,private modalController:ModalController) {}
  allowMemberAccess(){return this.access.includes(this.dataProvider.userData?.access.access)}
  ngOnInit() {
    // if(!this.pageName){
    //   alert('Page name is not provided')
    // } else if (!this.backUrl) {
    //   alert('Back url is not provided')
    // }
  }
  closeModal(){
    this.modalController.dismiss()
  }
  goBack() {
    this.back.emit()
    this.navController.setDirection('back');
    console.log(window.location.pathname);
    if (window.location.pathname.startsWith('/history/detail/')){
      this.navController.setDirection('back');
      this.route.navigate(['../history']);
    } else {
      this.navController.setDirection('back');
      this.route.navigate([this.backUrl]);
    }
  }

  scanQRCode() {
    // alert('Opening qr scanner')
    if (this.platform.is('capacitor')) {
    } else {
      // this.camera.click()
    }
  }
}
