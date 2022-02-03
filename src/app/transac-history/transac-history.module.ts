import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransacHistoryPageRoutingModule } from './transac-history-routing.module';

import { TransacHistoryPage } from './transac-history.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransacHistoryPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [TransacHistoryPage]
})
export class TransacHistoryPageModule {}
