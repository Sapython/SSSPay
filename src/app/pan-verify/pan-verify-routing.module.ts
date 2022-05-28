import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanVerifyPage } from './pan-verify.page';

const routes: Routes = [
  {
    path: '',
    component: PanVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanVerifyPageRoutingModule {}
