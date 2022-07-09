import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DthRechargePage } from './dth-recharge.page';

const routes: Routes = [
  {
    path: '',
    component: DthRechargePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DthRechargePageRoutingModule {}
