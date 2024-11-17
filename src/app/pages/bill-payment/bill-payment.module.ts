import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillPaymentPageRoutingModule } from './bill-payment-routing.module';

import { BillPaymentPage } from './bill-payment.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
import { ProviderPageComponent } from './provider-page/provider-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillPaymentPageRoutingModule,
    BaseComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BillPaymentPage,ProviderPageComponent]
})
export class BillPaymentPageModule {}
