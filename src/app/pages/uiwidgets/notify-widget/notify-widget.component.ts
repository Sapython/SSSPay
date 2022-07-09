import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
@Component({
  selector: 'app-notify-widget',
  templateUrl: './notify-widget.component.html',
  styleUrls: ['./notify-widget.component.scss'],
})
export class NotifyWidgetComponent implements OnInit {
  @Input() time:string = '1m27s'
  @Input() billsinfo:string = 'Pay electricity, postpaid, credit card & other bills!'


  constructor(public popoverController: PopoverController) {}
  ngOnInit() {}



  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();
  
    const  role  = await popover.onDidDismiss();
    console.log(role);
  }

}
