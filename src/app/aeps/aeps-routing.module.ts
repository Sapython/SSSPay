import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AepsPage } from './aeps.page';

const routes: Routes = [
  {
    path: '',
    component: AepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AepsPageRoutingModule {}
