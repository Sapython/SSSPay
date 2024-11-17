import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupNotAllowedPage } from './signup-not-allowed.page';

const routes: Routes = [
  {
    path: '',
    component: SignupNotAllowedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupNotAllowedPageRoutingModule {}
