import { RouterModule } from '@angular/router';
import { MobileRechargeWidgetComponent } from './mobile-recharge-widget/mobile-recharge-widget.component';
import { ContactsWidgetComponent } from './contacts-widget/contacts-widget.component';
import { IonicModule } from '@ionic/angular';
import { HomeWidgetComponent } from './home-widget/home-widget.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './widgets/widgets.component';
import { NotifyWidgetComponent } from './notify-widget/notify-widget.component';
import { TransactionWidgetComponent } from './transaction-widget/transaction-widget.component';
import { BankWidgetComponent } from './bank-widget/bank-widget.component';
import { LpgGasComponentsComponent } from './lpg-gas-components/lpg-gas-components.component';
import { RewardsComponentComponent } from './rewards-component/rewards-component.component';
import { OfferComponentComponent } from './offer-component/offer-component.component';


const components = [WidgetsComponent,HomeWidgetComponent,NotifyWidgetComponent,ContactsWidgetComponent,
MobileRechargeWidgetComponent,TransactionWidgetComponent,BankWidgetComponent,LpgGasComponentsComponent,RewardsComponentComponent,OfferComponentComponent]
@NgModule({
  exports: [components],
  declarations: [components],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class UiwidgetsModule { }