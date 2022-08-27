import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ViewBillComponent } from './view-bill/view-bill.component';

@Component({
  selector: 'app-dth-recharge',
  templateUrl: './dth-recharge.page.html',
  styleUrls: ['./dth-recharge.page.scss'],
})
export class DthRechargePage implements OnInit {
  dthForm: UntypedFormGroup = new UntypedFormGroup({
    operator: new UntypedFormControl('', [Validators.required]),
    caNumber: new UntypedFormControl('', [Validators.required,Validators.pattern('^[0-9]*$')]),
  });

  recentPayments: any[];
  operators:any[] = []
  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    private serverService: ServerService,
    private transactionsService: TransactionService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.dataProvider.pageSetting.blur = true;
    await this.serverService.getDistOperatorList().then((data: any) => {
      console.log(
        '🚀 ~ file: dth-recharge.page.ts ~ line 36 ~ DthRechargePage ~ this.serverService.getDistOperatorList ~ data',
        data
      );
      this.operators = data;
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    });
    this.transactionsService.getDTHPayments().then((docs) => {
      this.recentPayments = [];
      docs.forEach((doc) => {
        this.recentPayments.push({ ...doc.data(), id: doc.id });
      });
      console.log(this.recentPayments);
    });
  }

  submitDthForm() {
    this.dataProvider.pageSetting.blur = true;
    this.serverService
      .getDthInfo(this.dthForm.value.operator, this.dthForm.value.customerID)
      .then(async (data: any) => {
        const modal = await this.modalController.create({
          component: ViewBillComponent,
          componentProps: {
            rechargeData: data,
            formData: this.dthForm.value,
          },
        });
        await modal.present();
        console.log(data);
      })
      .finally(() => {
        this.dataProvider.pageSetting.blur = false;
      });
  }
}
