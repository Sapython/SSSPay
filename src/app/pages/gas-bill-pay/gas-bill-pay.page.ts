import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/structures/method.structure';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../services/authentication.service';
import { LocationService } from '../../services/location.service';
import { AlertsAndNotificationsService } from '../../services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-gas-bill-pay',
  templateUrl: './gas-bill-pay.page.html',
  styleUrls: ['./gas-bill-pay.page.scss'],
})
export class GasBillPayPage implements OnInit {
  operators: any[];
  @ViewChild('operatorSelect') operatorSelect: ElementRef;
  operator: any;
  bill:any;
  fields:any[] = [];
  latitude: number;
  longitude: number;
  operatorFetched: boolean = false;
  billFetched: boolean = false;
  lpgForm: UntypedFormGroup = new UntypedFormGroup({
    type: new FormControl('', [Validators.required]),
    operator: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private alertService: AlertsAndNotificationsService,
    private router: Router,
    private dataProvider: DataProvider,
    private locationService: LocationService,
    private serverService:ServerService,
    private transactionService:TransactionService
  ) {}

  ngOnInit() {
    // Get location

    this.locationService.getLatitudeAndLongitude().then((response) => {
      if (response.status) {
        this.latitude = response.latitude;
        this.longitude = response.longitude;
      } else {
        this.alertService.presentToast(response.message);
        this.router.navigate(['/homepage']);
      }
    });

  }

  getLpgOperators() {
    this.dataProvider.pageSetting.blur = true;
    this.serverService.getLpgOperatorList().then((data)=>{
      console.log("OPERATORS",data);
    }).catch((error)=>{
      console.log("ERROR",error);
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }

  getGasOperators(){
    this.dataProvider.pageSetting.blur = true;
    this.serverService.getGasOperatorList().then((data)=>{
      console.log("OPERATORS",data);
      this.operators = data;
    }).catch((error)=>{
      console.log("ERROR",error);
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }

  fetchOperators(event){
    if (event.detail.value=='LPG'){
      this.getLpgOperators();
    } else {
      this.getGasOperators();
    }
  }

  async getCoordinates(){
    const response = await this.locationService.getLatitudeAndLongitude();
    if (response.status){
      return response;
    } else {
      return null;
    }
  }
  
  operatorSelected(event){
    const operatorId = event.detail.value;
    this.operator = this.operators.find((operator)=>{
      return operator.id == operatorId;
    });
    let fields = []
    var counter = 0
    var fieldName = ''
    while (fieldName != null){
      const field = {}
      counter += 1
      fieldName = this.operator['ad'+counter+'_d_name']
      if (typeof fieldName == 'string'){
        field['name'] = fieldName
        
        const regexp = RegExp(this.operator['ad'+counter+'_regex'])
        console.log("REGEXP",regexp)
        const control = new FormControl('', [Validators.required,Validators.pattern(regexp)])
        this.lpgForm.addControl(this.operator['ad'+counter+'_name'], control)
        this.fields.push(this.operator['ad'+counter+'_name'])
        field['control'] = control
        fields.push(field)
      }
    }
    this.operator['fields'] = fields
    const control = new FormControl('', [Validators.required,Validators.pattern(RegExp(this.operator.regex))])
    this.lpgForm.addControl(this.operator.displayname, control)
    this.operator['mainField'] = {
      'name':this.operator.displayname,
      control:control
    }
    console.log("OPERATOR",this.operator)
    this.operatorFetched = true;
  }

  async fetchBill(customerNo){
    const response = await this.serverService.fetchLpgGasBill(customerNo,this.operator.id) 
    if (response.response_code == 1){
      this.billFetched = true;
      this.bill = response;
    }
  }

  async payLpgGasBill(){
    const coordinates = await this.getCoordinates()
    if (coordinates == null){
      this.alertService.presentToast("Could not get your location. Please try again later.")
      return;
    }
    const transaction:Transaction = {
      amount:this.bill.amount < 9 ? 10 : this.bill.amount,
      title:'LPG Gas Bill Payment',
      description:'LPG Gas Bill Payment for '+this.bill.name + ' for amount '+this.bill.amount,
      receiver:this.operator.name,
      date:new Date(),
      type:'gas',
      balance:this.dataProvider.wallet.balance,
      idempotencyKey:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      completed:false,
      status:'started',
      error:null,
      extraData:{
        ...this.lpgForm.value,
        latitude:coordinates.latitude,
        longitude:coordinates.longitude,
        customerNumber:this.operator['mainField'].control.value,
        fields:this.fields,
        customerId:this.dataProvider.userData.userId,
      }
    }
    this.dataProvider.pageSetting.blur = true;
    this.transactionService.addTransaction(transaction).then((transaction)=>{
      this.serverService.payLpgGasBill(transaction.id).then((response)=>{
        console.log("RESPONSE BILL PAY",response)
        this.alertService.presentToast("Transaction started. Please wait for the transaction to complete.")
        this.router.navigate(['../history/detail/'+transaction.id]);
      }).catch((error)=>{
        console.log("ERROR BILL PAY",error)
        this.alertService.presentToast("Could not start transaction. Please try again later.")
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      })
    }).catch((error)=>{
      console.log("ERROR",error)
      this.alertService.presentToast("Could not start transaction. Please try again later.")
      this.dataProvider.pageSetting.blur = false;
    })
  }
}
