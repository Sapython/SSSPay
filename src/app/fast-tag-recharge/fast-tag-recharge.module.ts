import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FastTagRechargePageRoutingModule } from './fast-tag-recharge-routing.module';

import { BaseComponentsModule } from '../base-components/base-components.module';
import { UiwidgetsModule } from '../uiwidgets/uiwidgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FastTagRechargePageRoutingModule,
    BaseComponentsModule,
    UiwidgetsModule,
  ],
  declarations: [],
})
export class FastTagRechargePageModule {}
