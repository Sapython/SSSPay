import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { ServerService } from 'src/app/services/server.service';
import { ProviderPageComponent } from './provider-page/provider-page.component';

@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.page.html',
  styleUrls: ['./bill-payment.page.scss'],
})
export class BillPaymentPage implements OnInit,OnDestroy {
  operators:any[] = []
  operatorCategories:any[] = []
  activeCategory:string | boolean;
  categorizedOperators:any[] = []
  
  constructor(private serverService:ServerService,private dataProvider:DataProvider,private modalController:ModalController) { }

  ngOnInit() {
    this.dataProvider.pageSetting.blur = true;
    this.serverService.getBillPaymentOperators().then((res)=>{
      console.log(res)
      this.operators = res.data
      res.data.forEach(element => {
        if (!this.operatorCategories.includes(element.category)){
          this.operatorCategories.push(element.category)
        }
      });
      console.log(this.operatorCategories)
      // sort operators in categories
    }).catch((err)=>{
      console.log("err",err)
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }

  async openBillProvider(operator:any){
    console.log("operator",operator)
    const modal = await this.modalController.create({
      component: ProviderPageComponent,
      componentProps: {
        operator: operator
      }
    })
    await modal.present()
  }
  ngOnDestroy(): void {
    this.dataProvider.pageSetting.blur = false;
    this.activeCategory = false;
  }
  resetData(){
    this.dataProvider.pageSetting.blur = false;
    this.activeCategory = false;
  }
}
