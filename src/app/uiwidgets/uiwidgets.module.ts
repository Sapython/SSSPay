import { MobileRechargeWidgetComponent } from './mobile-recharge-widget/mobile-recharge-widget.component';
import { ContactsWidgetComponent } from './contacts-widget/contacts-widget.component';
import { IonicModule } from '@ionic/angular';
import { HomeWidgetComponent } from './home-widget/home-widget.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './widgets/widgets.component';
import { NotifyWidgetComponent } from './notify-widget/notify-widget.component';


const components = [WidgetsComponent,HomeWidgetComponent,NotifyWidgetComponent,ContactsWidgetComponent,
MobileRechargeWidgetComponent]
@NgModule({
  exports: [components],
  declarations: [components],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class UiwidgetsModule { }