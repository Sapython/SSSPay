import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationRequestSentPage } from './verification-request-sent.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationRequestSentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationRequestSentPageRoutingModule {}
