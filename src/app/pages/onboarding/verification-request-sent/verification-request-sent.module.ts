import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationRequestSentPageRoutingModule } from './verification-request-sent-routing.module';

import { VerificationRequestSentPage } from './verification-request-sent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationRequestSentPageRoutingModule
  ],
  declarations: [VerificationRequestSentPage]
})
export class VerificationRequestSentPageModule {}
