import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicPage } from './lic.page';

const routes: Routes = [
  {
    path: '',
    component: LicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicPageRoutingModule {}
