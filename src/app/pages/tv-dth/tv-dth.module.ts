import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvDthPageRoutingModule } from './tv-dth-routing.module';

import { TvDthPage } from './tv-dth.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaseComponentsModule,
    TvDthPageRoutingModule
  ],
  declarations: [TvDthPage]
})
export class TvDthPageModule {}
