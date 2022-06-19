import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  CanActivate,
} from '@angular/router';
import { LoginguardGuard } from './guards/loginguard.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'recharge',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./recharge/recharge.module').then((m) => m.RechargePageModule),
  },
  {
    path: 'login',
    canActivate: [NotLoggedInGuard],
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'signup',
    canActivate: [NotLoggedInGuard],
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'forget-password',
    loadChildren: () =>
      import('./forget-password/forget-password.module').then(
        (m) => m.ForgetPasswordPageModule
      ),
  },
  {
    path: 'homepage',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./homepage/homepage.module').then((m) => m.HomepagePageModule),
  },
  {
    path: 'notifications',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
  {
    path: 'history',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./history/history.module').then((m) => m.HistoryPageModule),
  },
  {
    path: 'wallet',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./wallet/wallet.module').then((m) => m.WalletPageModule),
  },
  {
    path: 'transac-history',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./transac-history/transac-history.module').then(
        (m) => m.TransacHistoryPageModule
      ),
  },
  {
    path: 'recharge',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./recharge/recharge.module').then((m) => m.RechargePageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    path: 'aeps',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./aeps/aeps.module').then((m) => m.AepsPageModule),
  },
  {
    path: 'card-details',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./card-details/card-details.module').then(
        (m) => m.CardDetailsPageModule
      ),
  },
  {
    path: 'transfer-to-mobile',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./transfer-to-mobile/transfer-to-mobile.module').then(
        (m) => m.TransferToMobilePageModule
      ),
  },
  {
    path: 'qr',
    canActivate: [LoginguardGuard],
    loadChildren: () => import('./qr/qr.module').then((m) => m.QRPageModule),
  },
  {
    path: 'dth-recharge',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./dth-recharge/dth-recharge.module').then(
        (m) => m.DthRechargePageModule
      ),
  },

  {
    path: 'languages',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./languages/languages.module').then((m) => m.LanguagesPageModule),
  },

  {
    path: 'tv-dth',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./tv-dth/tv-dth.module').then((m) => m.TvDthPageModule),
  },
  {
    path: 'mobile-recharge',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./mobile-recharge/mobile-recharge.module').then(
        (m) => m.MobileRechargePageModule
      ),
  },
  {
    path: 'view-balance',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./view-balance/view-balance.module').then(
        (m) => m.ViewBalancePageModule
      ),
  },
  {
    path: 'upi-pin',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./upi-pin/upi-pin.module').then((m) => m.UpiPinPageModule),
  },
  {
    path: 'qr-scan',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./qr-scan/qr-scan.module').then((m) => m.QrScanPageModule),
  },
  {
    path: 'payment-status',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./payment-status/payment-status.module').then(
        (m) => m.PaymentStatusPageModule
      ),
  },
  {
    path: 'pan-verify',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./pan-verify/pan-verify.module').then(
        (m) => m.PanVerifyPageModule
      ),
  },
  {
    path: 'bank-transfer',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./bank-transfer/bank-transfer.module').then(
        (m) => m.BankTransferPageModule
      ),
  },
  {
    path: 'transaction-status',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./transaction-status/transaction-status.module').then(
        (m) => m.TransactionStatusPageModule
      ),
  },
  {
    path: 'fast-tag-recharge',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./fast-tag-recharge/fast-tag-recharge.module').then(
        (m) => m.FastTagRechargePageModule
      ),
  },
  {
    path: 'gas-bill-pay',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./gas-bill-pay/gas-bill-pay.module').then(
        (m) => m.GasBillPayPageModule
      ),
  },
  {
    path: 'rewards',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./rewards/rewards.module').then((m) => m.RewardsPageModule),
  },
  {
    path: 'offers',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./offers/offers.module').then((m) => m.OffersPageModule),
  },
  {
    path: 'invite',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./invite/invite.module').then((m) => m.InvitePageModule),
  },
  {
    path: 'profile',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'select-recharge-plan',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./select-recharge-plan/select-recharge-plan.module').then(
        (m) => m.SelectRechargePlanPageModule
      ),
  },
  {
    path: 'pan-verified',
    loadChildren: () =>
      import('./pan-verified/pan-verified.module').then(
        (m) => m.PanVerifiedPageModule
      ),
  },
  {
    path: 'onboarding/phone-and-dob',
    loadChildren: () =>
      import('./onboarding/phone-and-dob/phone-and-dob.module').then(
        (m) => m.PhoneAndDobPageModule
      ),
  },
  {
    path: 'onboarding/location',
    loadChildren: () =>
      import('./onboarding/location/location.module').then(
        (m) => m.LocationPageModule
      ),
  },
  {
    path: 'onboarding/aadhar',
    loadChildren: () =>
      import('./onboarding/aadhar/aadhar.module').then(
        (m) => m.AadharPageModule
      ),
  },
  {
    path: 'onboarding/pan',
    loadChildren: () =>
      import('./onboarding/pan/pan.module').then((m) => m.PanPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// {
//   path: '',
//   loadChildren: () => import('./recharge/recharge.module').then( m => m.RechargePageModule)
// },
// {
//   path: '',
//   loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
// },
// {
//   path: '',
//   loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
// },
