import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupNotAllowedPageRoutingModule } from './signup-not-allowed-routing.module';

import { SignupNotAllowedPage } from './signup-not-allowed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupNotAllowedPageRoutingModule
  ],
  declarations: [SignupNotAllowedPage]
})
export class SignupNotAllowedPageModule {}
