import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardDetailsPageRoutingModule } from './card-details-routing.module';

import { CardDetailsPage } from './card-details.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardDetailsPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [CardDetailsPage]
})
export class CardDetailsPageModule {}
