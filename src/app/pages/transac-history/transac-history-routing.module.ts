import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransacHistoryPage } from './transac-history.page';

const routes: Routes = [
  {
    path: '',
    component: TransacHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransacHistoryPageRoutingModule {}
