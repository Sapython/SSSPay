import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankTransferPageRoutingModule } from './bank-transfer-routing.module';

import { BankTransferPage } from './bank-transfer.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankTransferPageRoutingModule,BaseComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BankTransferPage]
})
export class BankTransferPageModule {}
