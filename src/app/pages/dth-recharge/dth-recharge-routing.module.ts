import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DthRechargePage } from './dth-recharge.page';

const routes: Routes = [
  {
    path: '',
    component: DthRechargePage
  },  {
    path: 'recharge',
    loadChildren: () => import('./recharge/recharge.module').then( m => m.RechargePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DthRechargePageRoutingModule {}
