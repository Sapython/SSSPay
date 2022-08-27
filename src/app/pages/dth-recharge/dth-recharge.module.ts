import { BaseComponentsModule } from './../base-components/base-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DthRechargePageRoutingModule } from './dth-recharge-routing.module';

import { DthRechargePage } from './dth-recharge.page';
import { ViewBillComponent } from './view-bill/view-bill.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DthRechargePageRoutingModule,
    BaseComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DthRechargePage,ViewBillComponent],
})
export class DthRechargePageModule {}
