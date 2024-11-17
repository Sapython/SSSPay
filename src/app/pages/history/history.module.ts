import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
import { UiwidgetsModule } from '../uiwidgets/uiwidgets.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    BaseComponentsModule,UiwidgetsModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
