import { BaseComponentsModule } from './../base-components/base-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewBalancePageRoutingModule } from './view-balance-routing.module';

import { ViewBalancePage } from './view-balance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBalancePageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [ViewBalancePage]
})
export class ViewBalancePageModule {}
