import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AepsPageRoutingModule } from './aeps-routing.module';

import { AepsPage } from './aeps.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
import { BankListModalComponent } from './bank-list-modal/bank-list-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AepsPageRoutingModule,
    BaseComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AepsPage,BankListModalComponent]
})
export class AepsPageModule {}
