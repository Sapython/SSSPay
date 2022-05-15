import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpiPinPage } from './upi-pin.page';

const routes: Routes = [
  {
    path: '',
    component: UpiPinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpiPinPageRoutingModule {}
