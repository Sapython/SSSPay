import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasBillPayPageRoutingModule } from './gas-bill-pay-routing.module';

import { GasBillPayPage } from './gas-bill-pay.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GasBillPayPageRoutingModule,
    BaseComponentsModule,
  ],
  declarations: [GasBillPayPage]
})
export class GasBillPayPageModule {}
