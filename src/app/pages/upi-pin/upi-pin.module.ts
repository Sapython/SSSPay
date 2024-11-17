import { BaseComponentsModule } from './../base-components/base-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpiPinPageRoutingModule } from './upi-pin-routing.module';

import { UpiPinPage } from './upi-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpiPinPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [UpiPinPage]
})
export class UpiPinPageModule {}
