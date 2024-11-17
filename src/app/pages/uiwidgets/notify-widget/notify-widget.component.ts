import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { PopoverComponent } from '../popover/popover.component';
@Component({
  selector: 'app-notify-widget',
  templateUrl: './notify-widget.component.html',
  styleUrls: ['./notify-widget.component.scss'],
})
export class NotifyWidgetComponent {
  @Input() notification:any;
  @Output() delete:EventEmitter<any> = new EventEmitter();
  constructor(public popoverController: PopoverController) {}

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
    if (role.data.status === 'delete') {
      this.delete.emit(this.notification);
    }
  }

}
