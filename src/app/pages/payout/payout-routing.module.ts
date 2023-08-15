import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletGuard } from 'src/app/guards/wallet.guard';

import { PayoutPage } from './payout.page';

const routes: Routes = [
  {
    path: '',
    component: PayoutPage
  },
  {
    path: 'express',
    loadChildren: () => import('./express/express.module').then( m => m.ExpressPageModule),
    canActivate: [WalletGuard]
  },
  {
    path: 'daily',
    loadChildren: () => import('./daily/daily.module').then( m => m.DailyPageModule),
    canActivate: [WalletGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayoutPageRoutingModule {}
