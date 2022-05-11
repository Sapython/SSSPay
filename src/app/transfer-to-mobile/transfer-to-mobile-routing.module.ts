import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferToMobilePage } from './transfer-to-mobile.page';

const routes: Routes = [
  {
    path: '',
    component: TransferToMobilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferToMobilePageRoutingModule {}
