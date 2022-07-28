import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterCanumberPageRoutingModule } from './enter-canumber-routing.module';

import { EnterCanumberPage } from './enter-canumber.page';
import { BaseComponentsModule } from '../../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EnterCanumberPageRoutingModule,
    BaseComponentsModule,
  ],
  declarations: [EnterCanumberPage],
})
export class EnterCanumberPageModule {}
