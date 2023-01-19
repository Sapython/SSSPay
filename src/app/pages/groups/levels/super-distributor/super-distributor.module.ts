import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperDistributorPageRoutingModule } from './super-distributor-routing.module';

import { SuperDistributorPage } from './super-distributor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperDistributorPageRoutingModule
  ],
  declarations: [SuperDistributorPage]
})
export class SuperDistributorPageModule {}
