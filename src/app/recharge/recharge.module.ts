import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechargePageRoutingModule } from './recharge-routing.module';

import { RechargePage } from './recharge.page';
import { UiwidgetsModule } from '../uiwidgets/uiwidgets.module';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechargePageRoutingModule,
    UiwidgetsModule,
    BaseComponentsModule
  ],
  declarations: [RechargePage]
})
export class RechargePageModule {}
