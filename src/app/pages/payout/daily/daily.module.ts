import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyPageRoutingModule } from './daily-routing.module';

import { DailyPage } from './daily.page';
import { UiwidgetsModule } from '../../uiwidgets/uiwidgets.module';
import { BaseComponentsModule } from '../../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyPageRoutingModule,
    BaseComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [DailyPage]
})
export class DailyPageModule {}
