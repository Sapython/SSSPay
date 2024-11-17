import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayBillPageRoutingModule } from './pay-bill-routing.module';

import { PayBillPage } from './pay-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayBillPageRoutingModule
  ],
  declarations: [PayBillPage]
})
export class PayBillPageModule {}
