import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanVerifiedPage } from './pan-verified.page';

const routes: Routes = [
  {
    path: '',
    component: PanVerifiedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanVerifiedPageRoutingModule {}
