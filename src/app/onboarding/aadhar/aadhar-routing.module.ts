import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AadharPage } from './aadhar.page';

const routes: Routes = [
  {
    path: '',
    component: AadharPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AadharPageRoutingModule {}
