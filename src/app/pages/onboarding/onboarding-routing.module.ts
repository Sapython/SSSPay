import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingPage } from './onboarding.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingPage,
    children:[
      {
        path: '',
        redirectTo: 'aadhaar',
        pathMatch: 'full'
      },
      {
        path:'aadhaar',
        loadChildren:()=>import('./aadhaar/aadhaar.module').then(m=>m.AadhaarPageModule)
      },
      {
        path:'location',
        loadChildren:()=>import('./location/location.module').then(m=>m.LocationPageModule)
      },
      {
        path:'pan',
        loadChildren:()=>import('./pan/pan.module').then(m=>m.PanPageModule)
      },
      {
        path:'phone-and-dob',
        loadChildren:()=>import('./phone-and-dob/phone-and-dob.module').then(m=>m.PhoneAndDobPageModule)
      },
      {
        path:'verified',
        loadChildren:()=>import('./verified/verified.module').then(m=>m.VerifiedPageModule)
      },
      {
        path: 'verification-request-sent',
        loadChildren: () => import('./verification-request-sent/verification-request-sent.module').then( m => m.VerificationRequestSentPageModule)
      },
      {
        path: 'rejected',
        loadChildren: () => import('./rejected/rejected.module').then( m => m.RejectedPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingPageRoutingModule {}
