import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayBillPage } from './pay-bill.page';

const routes: Routes = [
  {
    path: '',
    component: PayBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayBillPageRoutingModule {}
