import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  // },
  {
    path: '',
    loadChildren: () =>
      import('./homepage/homepage.module').then((m) => m.HomepagePageModule),
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./recharge/recharge.module').then( m => m.RechargePageModule)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  // },
  {
    path: '',
    loadChildren: () =>
      import('./recharge/recharge.module').then((m) => m.RechargePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'signup',
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
    loadChildren: () =>
      import('./homepage/homepage.module').then((m) => m.HomepagePageModule),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./history/history.module').then((m) => m.HistoryPageModule),
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('./wallet/wallet.module').then((m) => m.WalletPageModule),
  },
  {
    path: 'transac-history',
    loadChildren: () =>
      import('./transac-history/transac-history.module').then(
        (m) => m.TransacHistoryPageModule
      ),
  },
  {
    path: 'recharge',
    loadChildren: () =>
      import('./recharge/recharge.module').then((m) => m.RechargePageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'aeps',
    loadChildren: () => import('./aeps/aeps.module').then( m => m.AepsPageModule)
  },
  {
    path: 'card-details',
    loadChildren: () => import('./card-details/card-details.module').then( m => m.CardDetailsPageModule)
  },
  {
    path: 'transfer-to-mobile',
    loadChildren: () => import('./transfer-to-mobile/transfer-to-mobile.module').then( m => m.TransferToMobilePageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then( m => m.QRPageModule)
  },
  {
    path: 'dth-recharge',
    loadChildren: () => import('./dth-recharge/dth-recharge.module').then( m => m.DthRechargePageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'languages',
    loadChildren: () => import('./languages/languages.module').then( m => m.LanguagesPageModule)
  },

  {
    path: 'tv-dth',
    loadChildren: () => import('./tv-dth/tv-dth.module').then( m => m.TvDthPageModule)
  },  {
    path: 'mobile-recharge',
    loadChildren: () => import('./mobile-recharge/mobile-recharge.module').then( m => m.MobileRechargePageModule)
  },
  {
    path: 'view-balance',
    loadChildren: () => import('./view-balance/view-balance.module').then( m => m.ViewBalancePageModule)
  },
  {
    path: 'upi-pin',
    loadChildren: () => import('./upi-pin/upi-pin.module').then( m => m.UpiPinPageModule)
  },
  {
    path: 'qr-scan',
    loadChildren: () => import('./qr-scan/qr-scan.module').then( m => m.QrScanPageModule)
  },
  {
    path: 'payment-status',
    loadChildren: () => import('./payment-status/payment-status.module').then( m => m.PaymentStatusPageModule)
  },
  {
    path: 'pan-verify',
    loadChildren: () => import('./pan-verify/pan-verify.module').then( m => m.PanVerifyPageModule)
  },
  {
    path: 'bank-transfer',
    loadChildren: () => import('./bank-transfer/bank-transfer.module').then( m => m.BankTransferPageModule)
  },
  {
    path: 'transaction-status',
    loadChildren: () => import('./transaction-status/transaction-status.module').then( m => m.TransactionStatusPageModule)
  },
  {
    path: 'fast-tag-recharge',
    loadChildren: () => import('./fast-tag-recharge/fast-tag-recharge.module').then( m => m.FastTagRechargePageModule)
  },
  {
    path: 'gas-bill-pay',
    loadChildren: () => import('./gas-bill-pay/gas-bill-pay.module').then( m => m.GasBillPayPageModule)
  },
  {
    path: 'rewards',
    loadChildren: () => import('./rewards/rewards.module').then( m => m.RewardsPageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'invite',
    loadChildren: () => import('./invite/invite.module').then( m => m.InvitePageModule)
  },
  {
    path: 'upi',
    loadChildren: () => import('./upi/upi.module').then( m => m.UpiPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
