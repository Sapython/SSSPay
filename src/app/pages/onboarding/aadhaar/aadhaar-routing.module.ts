import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AadhaarPage } from './aadhaar.page';

const routes: Routes = [
  {
    path: '',
    component: AadhaarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class aadhaarPageRoutingModule {}
