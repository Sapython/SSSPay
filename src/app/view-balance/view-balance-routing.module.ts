import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBalancePage } from './view-balance.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBalancePageRoutingModule {}
