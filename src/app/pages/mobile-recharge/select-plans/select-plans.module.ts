import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPlansPageRoutingModule } from './select-plans-routing.module';

import { SelectPlansPage } from './select-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPlansPageRoutingModule
  ],
  declarations: [SelectPlansPage]
})
export class SelectPlansPageModule {}
