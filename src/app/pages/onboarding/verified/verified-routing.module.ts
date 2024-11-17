import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifiedPage } from './verified.page';

const routes: Routes = [
  {
    path: '',
    component: VerifiedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifiedPageRoutingModule {}
