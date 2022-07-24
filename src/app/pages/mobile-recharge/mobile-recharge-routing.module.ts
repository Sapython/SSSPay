import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileRechargePage } from './mobile-recharge.page';

const routes: Routes = [
  {
    path: '',
    component: MobileRechargePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileRechargePageRoutingModule {}
