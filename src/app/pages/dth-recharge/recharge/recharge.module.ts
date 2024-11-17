import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechargePageRoutingModule } from './recharge-routing.module';

import { RechargePage } from './recharge.page';
import { BaseComponentsModule } from '../../base-components/base-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RechargePageRoutingModule,
    BaseComponentsModule,
  ],
  declarations: [RechargePage]
})
export class RechargePageModule {}
