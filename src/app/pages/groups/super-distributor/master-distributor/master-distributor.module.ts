import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterDistributorPageRoutingModule } from './master-distributor-routing.module';

import { MasterDistributorPage } from './master-distributor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterDistributorPageRoutingModule
  ],
  declarations: [MasterDistributorPage]
})
export class MasterDistributorPageModule {}
