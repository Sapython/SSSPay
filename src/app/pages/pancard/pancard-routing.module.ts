import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PancardPage } from './pancard.page';

const routes: Routes = [
  {
    path: '',
    component: PancardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PancardPageRoutingModule {}
