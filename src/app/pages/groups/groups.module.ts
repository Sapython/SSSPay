import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsPageRoutingModule } from './groups-routing.module';

import { GroupsPage } from './groups.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
import { ManageMembersPage } from './manage-members/manage-members.page';
import { AddMemberComponent } from './manage-members/add-member/add-member.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GroupsPageRoutingModule,
    BaseComponentsModule,
  ],
  declarations: [GroupsPage,AddMemberComponent]
})
export class GroupsPageModule {}
