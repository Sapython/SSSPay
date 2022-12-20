import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageMembersPageRoutingModule } from './manage-members-routing.module';

import { ManageMembersPage } from './manage-members.page';
import { AddMemberComponent } from './add-member/add-member.component';
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
  declarations: [ManageMembersPage,AddMemberComponent]
})
export class ManageMembersPageModule {}
