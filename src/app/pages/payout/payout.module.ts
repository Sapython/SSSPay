import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayoutPageRoutingModule } from './payout-routing.module';

import { PayoutPage } from './payout.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
import { UiwidgetsModule } from '../uiwidgets/uiwidgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayoutPageRoutingModule,
    UiwidgetsModule,
    BaseComponentsModule
  ],
  declarations: [PayoutPage]
})
export class PayoutPageModule {}
