import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpressPageRoutingModule } from './express-routing.module';

import { ExpressPage } from './express.page';
import { BaseComponentsModule } from '../../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpressPageRoutingModule,
    BaseComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ExpressPage]
})
export class ExpressPageModule {}
