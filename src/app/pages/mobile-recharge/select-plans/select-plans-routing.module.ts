import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPlansPage } from './select-plans.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPlansPageRoutingModule {}
