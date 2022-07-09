import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanVerifiedPageRoutingModule } from './pan-verified-routing.module';

import { PanVerifiedPage } from './pan-verified.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanVerifiedPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [PanVerifiedPage]
})
export class PanVerifiedPageModule {}
