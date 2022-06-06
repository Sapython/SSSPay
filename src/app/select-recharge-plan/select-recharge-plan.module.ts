import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectRechargePlanPageRoutingModule } from './select-recharge-plan-routing.module';

import { SelectRechargePlanPage } from './select-recharge-plan.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectRechargePlanPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [SelectRechargePlanPage]
})
export class SelectRechargePlanPageModule {}
