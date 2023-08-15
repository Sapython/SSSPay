import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanPageRoutingModule } from './pan-routing.module';

import { PanPage } from './pan.page';
import { BaseComponentsModule } from '../../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanPageRoutingModule,
    BaseComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [PanPage]
})
export class PanPageModule {}
