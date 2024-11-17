import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { aadhaarPageRoutingModule } from './aadhaar-routing.module';

import { AadhaarPage } from './aadhaar.page';
import { BaseComponentsModule } from '../../base-components/base-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    aadhaarPageRoutingModule,
    BaseComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AadhaarPage],
})
export class AadhaarPageModule {}
