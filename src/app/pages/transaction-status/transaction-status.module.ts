import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionStatusPageRoutingModule } from './transaction-status-routing.module';

import { TransactionStatusPage } from './transaction-status.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionStatusPageRoutingModule,BaseComponentsModule
  ],
  declarations: [TransactionStatusPage]
})
export class TransactionStatusPageModule {}
