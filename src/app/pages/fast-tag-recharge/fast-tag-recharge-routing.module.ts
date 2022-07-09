import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FastTagRechargePage } from './fast-tag-recharge.page';

const routes: Routes = [
  {
    path: '',
    component: FastTagRechargePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastTagRechargePageRoutingModule {}
