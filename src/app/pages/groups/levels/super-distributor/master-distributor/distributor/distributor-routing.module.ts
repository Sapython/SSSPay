import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistributorPage } from './distributor.page';

const routes: Routes = [
  {
    path: '',
    component: DistributorPage
  },
  {
    path: 'retailer',
    loadChildren: () => import('./retailer/retailer.module').then( m => m.RetailerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DistributorPageRoutingModule {}
