import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalAccountPageRoutingModule } from './digital-account-routing.module';

import { DigitalAccountPage } from './digital-account.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitalAccountPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [DigitalAccountPage]
})
export class DigitalAccountPageModule {}
