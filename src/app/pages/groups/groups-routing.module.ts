import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsPage } from './groups.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsPage
  },
  {
    path: 'manage-group',
    loadChildren: () => import('./manage-group/manage-group.module').then( m => m.ManageGroupPageModule)
  },
  {
    path: 'manage-member',
    loadChildren: () => import('./manage-members/manage-members.module').then( m => m.ManageMembersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
