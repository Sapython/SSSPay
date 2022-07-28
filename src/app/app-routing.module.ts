import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  CanActivate,
} from '@angular/router';
import { LoginguardGuard } from './guards/loginguard.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { OnboardingGuard } from './guards/onboarding.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'recharge',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/recharge/recharge.module').then((m) => m.RechargePageModule),
  },
  {
    path: 'login',
    canActivate: [NotLoggedInGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    canActivate: [NotLoggedInGuard],
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'forget-password',
    loadChildren: () =>
      import('./pages/forget-password/forget-password.module').then(
        (m) => m.ForgetPasswordPageModule
      ),
  },
  {
    path: 'homepage',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./pages/homepage/homepage.module').then((m) => m.HomepagePageModule),
  },
  {
    path: 'notifications',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./pages/notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
  {
    path: 'history',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./pages/history/history.module').then((m) => m.HistoryPageModule),
  },
  {
    path: 'wallet',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/wallet/wallet.module').then((m) => m.WalletPageModule),
  },
  {
    path: 'transac-history',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./pages/transac-history/transac-history.module').then(
        (m) => m.TransacHistoryPageModule
      ),
  },
  {
    path: 'recharge',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/recharge/recharge.module').then((m) => m.RechargePageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./pages/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    path: 'aeps',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/aeps/aeps.module').then((m) => m.AepsPageModule),
  },
  {
    path: 'card-details',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/card-details/card-details.module').then(
        (m) => m.CardDetailsPageModule
      ),
  },
  {
    path: 'transfer-to-mobile',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/transfer-to-mobile/transfer-to-mobile.module').then(
        (m) => m.TransferToMobilePageModule
      ),
  },
  {
    path: 'qr',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () => import('./pages/qr/qr.module').then((m) => m.QRPageModule),
  },
  {
    path: 'dth-recharge',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/dth-recharge/dth-recharge.module').then(
        (m) => m.DthRechargePageModule
      ),
  },

  {
    path: 'languages',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./pages/languages/languages.module').then((m) => m.LanguagesPageModule),
  },

  {
    path: 'tv-dth',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/tv-dth/tv-dth.module').then((m) => m.TvDthPageModule),
  },
  {
    path: 'mobile-recharge',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/mobile-recharge/mobile-recharge.module').then(
        (m) => m.MobileRechargePageModule
      ),
  },
  {
    path: 'view-balance',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/view-balance/view-balance.module').then(
        (m) => m.ViewBalancePageModule
      ),
  },
  {
    path: 'upi-pin',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/upi-pin/upi-pin.module').then((m) => m.UpiPinPageModule),
  },
  {
    path: 'qr-scan',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/qr-scan/qr-scan.module').then((m) => m.QrScanPageModule),
  },
  {
    path: 'payment-status',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/payment-status/payment-status.module').then(
        (m) => m.PaymentStatusPageModule
      ),
  },
  {
    path: 'pan-verify',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./pages/pan-verify/pan-verify.module').then(
        (m) => m.PanVerifyPageModule
      ),
  },
  {
    path: 'bank-transfer',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/bank-transfer/bank-transfer.module').then(
        (m) => m.BankTransferPageModule
      ),
  },
  {
    path: 'transaction-status',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./pages/transaction-status/transaction-status.module').then(
        (m) => m.TransactionStatusPageModule
      ),
  },
  {
    path: 'fast-tag-recharge',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/fast-tag-recharge/fast-tag-recharge.module').then(
        (m) => m.FastTagRechargePageModule
      ),
  },
  {
    path: 'gas-bill-pay',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/gas-bill-pay/gas-bill-pay.module').then(
        (m) => m.GasBillPayPageModule
      ),
  },
  {
    path: 'rewards',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/rewards/rewards.module').then((m) => m.RewardsPageModule),
  },
  {
    path: 'offers',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/offers/offers.module').then((m) => m.OffersPageModule),
  },
  {
    path: 'invite',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/invite/invite.module').then((m) => m.InvitePageModule),
  },
  {
    path: 'profile',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'select-recharge-plan',
    canActivate: [LoginguardGuard,OnboardingGuard],
    loadChildren: () =>
      import('./pages/select-recharge-plan/select-recharge-plan.module').then(
        (m) => m.SelectRechargePlanPageModule
      ),
  },
  {
    path: 'pan-verified',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./pages/pan-verified/pan-verified.module').then(
        (m) => m.PanVerifiedPageModule
      ),
  },
  {
    path: 'onboarding',
    canActivate: [LoginguardGuard],
    loadChildren: () =>
      import('./pages/onboarding/onboarding.module').then(
        (m) => m.OnboardingPageModule
      ),
  },  {
    path: 'payout',
    loadChildren: () => import('./pages/payout/payout.module').then( m => m.PayoutPageModule)
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
//   path: '',
//   loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
// },
// {
//   path: '',
//   loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
// },
