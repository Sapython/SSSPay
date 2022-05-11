import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletPageRoutingModule } from './wallet-routing.module';

import { WalletPage } from './wallet.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
import { ModalModule } from '../_modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule,
    BaseComponentsModule,
    ModalModule,
  ],
  declarations: [WalletPage],
})
export class WalletPageModule {}
