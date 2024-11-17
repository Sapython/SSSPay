import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectOperatorPage } from './select-operator.page';

const routes: Routes = [
  {
    path: '',
    component: SelectOperatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectOperatorPageRoutingModule {}
