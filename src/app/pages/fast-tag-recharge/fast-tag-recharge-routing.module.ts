import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'select-operator',
    pathMatch: 'full',
  },
  {
    path: 'select-operator',
    loadChildren: () =>
      import('./select-operator/select-operator.module').then(
        (m) => m.SelectOperatorPageModule
      ),
  },
  {
    path: 'pay-bill',
    loadChildren: () => import('./pay-bill/pay-bill.module').then( m => m.PayBillPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastTagRechargePageRoutingModule {}
