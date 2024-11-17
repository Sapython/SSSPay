import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const components1 = [HeaderComponent,FooterComponent,]
@NgModule({
  exports:[HeaderComponent],
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BaseComponentsModule { }
