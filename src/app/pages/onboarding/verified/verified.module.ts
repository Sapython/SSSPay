import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifiedPageRoutingModule } from './verified-routing.module';

import { VerifiedPage } from './verified.page';
import { BaseComponentsModule } from '../../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifiedPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [VerifiedPage]
})
export class VerifiedPageModule {}
