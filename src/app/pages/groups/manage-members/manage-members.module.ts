import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageMembersPageRoutingModule } from './manage-members-routing.module';

import { ManageMembersPage } from './manage-members.page';
import { BaseComponentsModule } from '../../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageMembersPageRoutingModule,
    BaseComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ManageMembersPage]
})
export class ManageMembersPageModule {}
