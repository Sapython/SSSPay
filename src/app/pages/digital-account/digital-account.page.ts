import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { ServerService } from 'src/app/services/server.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-digital-account',
  templateUrl: './digital-account.page.html',
  styleUrls: ['./digital-account.page.scss'],
})
export class DigitalAccountPage implements OnInit {

  constructor(private serverService:ServerService,private dataProvider:DataProvider) { }
  gotLink:boolean = false;
  ngOnInit() {
    this.dataProvider.pageSetting.blur = true;
    this.serverService.getUtmLink().then(async (utm)=>{
      if(utm){
        this.gotLink = true;
        await Browser.open({ url: utm.data });
      }
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }

}
