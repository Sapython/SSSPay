import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasBillPayPageRoutingModule } from './gas-bill-pay-routing.module';

import { GasBillPayPage } from './gas-bill-pay.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
import { UiwidgetsModule } from '../uiwidgets/uiwidgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GasBillPayPageRoutingModule,
    BaseComponentsModule,
    UiwidgetsModule
  ],
  declarations: [GasBillPayPage]
})
export class GasBillPayPageModule {}
