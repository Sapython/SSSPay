import { UiwidgetsModule } from './../uiwidgets/uiwidgets.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferToMobilePageRoutingModule } from './transfer-to-mobile-routing.module';

import { TransferToMobilePage } from './transfer-to-mobile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferToMobilePageRoutingModule,
    UiwidgetsModule
  ],
  declarations: [TransferToMobilePage]
})
export class TransferToMobilePageModule {}
