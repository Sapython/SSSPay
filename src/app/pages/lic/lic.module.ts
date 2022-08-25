import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicPageRoutingModule } from './lic-routing.module';

import { LicPage } from './lic.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicPageRoutingModule,
    BaseComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [LicPage]
})
export class LicPageModule {}
