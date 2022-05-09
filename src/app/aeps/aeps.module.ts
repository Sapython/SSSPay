import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AepsPageRoutingModule } from './aeps-routing.module';

import { AepsPage } from './aeps.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AepsPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [AepsPage]
})
export class AepsPageModule {}
