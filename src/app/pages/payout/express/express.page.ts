import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { Transaction } from 'src/app/structures/method.structure';

@Component({
  selector: 'app-express',
  templateUrl: './express.page.html',
  styleUrls: ['./express.page.scss'],
})
export class ExpressPage implements OnInit {
  addingAccount: boolean = false;
  usingData: boolean = false;
  payoutForm: FormGroup = new FormGroup({
    amount: new FormControl(null, [
      Validators.required,
      Validators.max(this.dataProvider.wallet.balance),
      Validators.min(10),
    ]),
    description: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    contact: new FormControl(null, [Validators.required]),
    accountType: new FormControl(null, [Validators.required]),
    bankAccountName: new FormControl(null),
    accountNumber: new FormControl(null),
    paymentType: new FormControl(null,[Validators.required]),
    ifsc: new FormControl(null),
    vpa: new FormControl(null),
    cardNumber: new FormControl(null),
    cardName: new FormControl(null),
  });
  fundAccounts = [];
  previousDetails: any[] = [];
  constructor(
    public dataProvider: DataProvider,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private serverService: ServerService,
    public transactionService: TransactionService,
    private router:Router
  ) {}

  ngOnInit() {
    this.fundAccounts = [];
    this.fundAccounts = this.dataProvider.userData.payoutFundAccount;
    console.log(this.fundAccounts);
    
    this.payoutForm.valueChanges.subscribe((value) => {
      this.usingData = false;
    })
    this.databaseService.getPayoutDetails().then((res)=>{
      this.previousDetails = []
      res.forEach((doc)=>{
        this.previousDetails.push({...doc.data(),id:doc.id})
      })
      console.log(this.previousDetails)
    })
  }

  async saveDetail(){
    this.payoutForm.value.date = new Date();
    await this.databaseService.savePayoutDetail(this.payoutForm.value)
  }

  checkErrors(){
    // get errors
    let errors = []
    Object.keys(this.payoutForm.controls).forEach(key => {
      const control = this.payoutForm.get(key);
      if (control.errors) {
        errors.push(key);
      }
    })
    if (errors.length > 0) {
      this.alertify.presentToast('Problems with'+errors.join(', '));
    } else {
      this.alertify.presentToast('No Problems');
    }
    console.log(this.payoutForm.value)
  }

  changeControl(event) {
    if (event.detail.value == 'bank_account') {
      this.payoutForm
        .get('bankAccountName')
        .setValidators([Validators.required]);
      this.payoutForm
        .get('accountNumber')
        .setValidators([Validators.required,Validators.minLength(8),Validators.maxLength(18)]);
      this.payoutForm.get('ifsc').setValidators([Validators.required]);
    } else if (event.detail.value == 'vpa') {
      this.payoutForm.get('vpa').setValidators([Validators.required,Validators.email]);
    } else if (event.detail.value == 'card') {
      this.payoutForm
        .get('cardNumber')
        .setValidators([Validators.required]);
      this.payoutForm
        .get('cardName')
        .setValidators([Validators.required]);
    }
  }

  setValue(val:string){
    this.payoutForm.patchValue({paymentType:val})
    console.log(this.payoutForm.value)
  }

  setControls() {
    if (this.payoutForm.value.account.accountType === 'bank_account') {
      this.payoutForm.get('accountType').addValidators([Validators.required]);
    } else {
      this.payoutForm
        .get('accountType')
        .removeValidators([Validators.required]);
    }
  }

  async makePayout() {
    if(this.usingData){
      this.payoutForm.value.date = new Date();
      await this.databaseService.savePayoutDetail(this.payoutForm.value)
    }
    const transaction: Transaction = {
      ownerId:this.dataProvider.userData?.ownerId || null,
      serviceType:this.payoutForm.value.paymentType =='vpa'? 'expressPayoutUpi' : 'expressPayoutImps',
      amount: Number(this.payoutForm.get('amount').value),
      date: new Date(),
      type: 'expressPayout',
      description: 'Payout: ' + this.payoutForm.value.description,
      balance: this.dataProvider.wallet.balance,
      idempotencyKey: this.generateIdemPotencyKey(),
      completed: false,
      status: 'started',
      error: null,
      receiver:'SSSPay Payout',
      extraData: {
        ...this.payoutForm.value,
        account:{
          ...this.payoutForm.value,
        },
        customerId: this.dataProvider.userData.userId,
        accountType: this.payoutForm.value.accountType,
        paymentType: this.payoutForm.value.paymentType =='vpa'? 'UPI' :this.payoutForm.value.paymentType,
        dailyPayoutTime: this.dataProvider.userData.dailyPayoutTime || null,
      },
    };
    console.log('transaction',transaction);
    this.transactionService.addTransaction(transaction).then(async (docRef) => {
      this.dataProvider.pageSetting.blur = true;
      console.log('transactionAdded',docRef.id,docRef);
      const response = await this.serverService.makeExpressPayout(docRef.id).then((res)=>{
        console.log('response',res);
      }).catch((err)=>{
        console.log('error',err);
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      })
      console.log('response  => ',response);
      this.router.navigate(['../../history/detail/'+docRef.id]);
    });
  }

  // generateIdemPotencyKey
  generateIdemPotencyKey() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  loadDetails(data){
    let dirty = false;
    Object.keys(this.payoutForm.value).forEach(key => {
      if(this.payoutForm.value[key] != null){
        dirty = true;
      }
    })
    if(dirty){
      if(confirm('Are you sure you want to load new details?')){
        this.payoutForm.patchValue(data);
        if (data.paymentType=='bacnk_account'){
          this.payoutForm.controls['paymentType'].reset()
        }
        this.alertify.presentToast('Details loaded');
      }
    } else {
      this.payoutForm.patchValue(data);
      if (data.paymentType=='bacnk_account'){
        this.payoutForm.controls['paymentType'].reset()
      }
      this.alertify.presentToast('Details loaded');
    }
  }


  transactionType(event){

  }
}
