import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
import { ModalModule } from '../_modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    BaseComponentsModule,
    ModalModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
