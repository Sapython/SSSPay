import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayoutPage } from './payout.page';

const routes: Routes = [
  {
    path: '',
    component: PayoutPage
  },
  {
    path: 'express',
    loadChildren: () => import('./express/express.module').then( m => m.ExpressPageModule)
  },
  {
    path: 'daily',
    loadChildren: () => import('./daily/daily.module').then( m => m.DailyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayoutPageRoutingModule {}
