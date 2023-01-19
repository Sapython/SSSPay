import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterDistributorPage } from './master-distributor.page';

const routes: Routes = [
  {
    path: '',
    component: MasterDistributorPage
  },
  {
    path: 'distributor',
    loadChildren: () => import('./distributor/distributor.module').then( m => m.DistributorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDistributorPageRoutingModule {}
