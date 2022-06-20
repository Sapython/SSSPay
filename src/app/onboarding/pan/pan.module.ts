import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanPageRoutingModule } from './pan-routing.module';

import { PanPage } from './pan.page';
import { BaseComponentsModule } from 'src/app/base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [PanPage]
})
export class PanPageModule {}
