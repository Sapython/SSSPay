import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneAndDobPage } from './phone-and-dob.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneAndDobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneAndDobPageRoutingModule {}
