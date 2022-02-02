import { HomeWidgetComponent } from './home-widget/home-widget.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './widgets/widgets.component';


const components = [WidgetsComponent,HomeWidgetComponent]
@NgModule({
  exports: [components],
  declarations: [components],
  imports: [
    CommonModule
  ]
})
export class UiwidgetsModule { }