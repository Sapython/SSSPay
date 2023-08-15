import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageGroupPage } from './manage-group.page';

const routes: Routes = [
  {
    path: ':groupId',
    component: ManageGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageGroupPageRoutingModule {}
