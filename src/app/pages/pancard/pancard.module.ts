import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PancardPageRoutingModule } from './pancard-routing.module';

import { PancardPage } from './pancard.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PancardPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [PancardPage]
})
export class PancardPageModule {}
