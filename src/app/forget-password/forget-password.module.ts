import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ModalModule} from '../_modal'
import { ForgetPasswordPageRoutingModule } from './forget-password-routing.module';

import { ForgetPasswordPage } from './forget-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetPasswordPageRoutingModule,
    ModalModule
  ],
  declarations: [ForgetPasswordPage]
})
export class ForgetPasswordPageModule {}
