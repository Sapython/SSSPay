import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AadharPageRoutingModule } from './aadhar-routing.module';

import { AadharPage } from './aadhar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AadharPageRoutingModule
  ],
  declarations: [AadharPage]
})
export class AadharPageModule {}
