import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvDthPage } from './tv-dth.page';

const routes: Routes = [
  {
    path: '',
    component: TvDthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvDthPageRoutingModule {}
