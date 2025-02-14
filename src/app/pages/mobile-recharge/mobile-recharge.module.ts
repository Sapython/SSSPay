import { UiwidgetsModule } from './../uiwidgets/uiwidgets.module';
import { BaseComponentsModule } from './../base-components/base-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileRechargePageRoutingModule } from './mobile-recharge-routing.module';

import { MobileRechargePage } from './mobile-recharge.page';
import { SelectPlansPage } from './select-plans/select-plans.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileRechargePageRoutingModule,
    BaseComponentsModule,
    UiwidgetsModule,
    ReactiveFormsModule
  ],
  declarations: [MobileRechargePage,SelectPlansPage]
})
export class MobileRechargePageModule {}
