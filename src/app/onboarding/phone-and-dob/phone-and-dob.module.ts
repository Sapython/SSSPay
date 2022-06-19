import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneAndDobPageRoutingModule } from './phone-and-dob-routing.module';

import { PhoneAndDobPage } from './phone-and-dob.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneAndDobPageRoutingModule
  ],
  declarations: [PhoneAndDobPage]
})
export class PhoneAndDobPageModule {}
