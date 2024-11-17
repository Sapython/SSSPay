import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectOperatorPageRoutingModule } from './select-operator-routing.module';

import { SelectOperatorPage } from './select-operator.page';
import { BaseComponentsModule } from '../../base-components/base-components.module';
import { UiwidgetsModule } from '../../uiwidgets/uiwidgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectOperatorPageRoutingModule,
    BaseComponentsModule,
    UiwidgetsModule,
  ],
  declarations: [SelectOperatorPage],
})
export class SelectOperatorPageModule {}
