import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { BaseComponentsModule } from '../../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DetailsPageRoutingModule,
    BaseComponentsModule,
  ],
  declarations: [DetailsPage],
})
export class DetailsPageModule {}
