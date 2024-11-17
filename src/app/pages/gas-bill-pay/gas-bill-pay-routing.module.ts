import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GasBillPayPage } from './gas-bill-pay.page';

const routes: Routes = [
  {
    path: '',
    component: GasBillPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GasBillPayPageRoutingModule {}
