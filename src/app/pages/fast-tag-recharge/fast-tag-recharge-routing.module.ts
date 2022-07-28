import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'select-operator',
    pathMatch: 'full',
  },
  {
    path: 'select-operator',
    loadChildren: () =>
      import('./select-operator/select-operator.module').then(
        (m) => m.SelectOperatorPageModule
      ),
  },
  {
    path: 'enter-canumber',
    loadChildren: () => import('./enter-canumber/enter-canumber.module').then( m => m.EnterCanumberPageModule)
  },  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastTagRechargePageRoutingModule {}
