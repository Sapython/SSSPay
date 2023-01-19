import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperDistributorPage } from './super-distributor.page';

const routes: Routes = [
  {
    path: '',
    component: SuperDistributorPage
  },
  {
    path: 'master-distributor',
    loadChildren: () => import('./master-distributor/master-distributor.module').then( m => m.MasterDistributorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperDistributorPageRoutingModule {}
