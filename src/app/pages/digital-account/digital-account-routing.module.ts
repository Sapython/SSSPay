import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalAccountPage } from './digital-account.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalAccountPageRoutingModule {}
