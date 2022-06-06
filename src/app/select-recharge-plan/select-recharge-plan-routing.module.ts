import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectRechargePlanPage } from './select-recharge-plan.page';

const routes: Routes = [
  {
    path: '',
    component: SelectRechargePlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectRechargePlanPageRoutingModule {}
