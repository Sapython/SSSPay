import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  payoutForm: UntypedFormGroup = new UntypedFormGroup({
    amount: new UntypedFormControl(null, [
      Validators.required,
      Validators.max(this.dataProvider.wallet.balance),
      Validators.min(0),
    ]),
    description: new UntypedFormControl(null, [Validators.required]),
    name: new UntypedFormControl(null, [Validators.required]),
    email: new UntypedFormControl(null, [Validators.required]),
    contact: new UntypedFormControl(null, [Validators.required]),
    accountType: new UntypedFormControl(null, [Validators.required]),
    bankAccountName: new UntypedFormControl(null),
    accountNumber: new UntypedFormControl(null),
    paymentType: new UntypedFormControl(null),
    ifsc: new UntypedFormControl(null),
    vpa: new UntypedFormControl(null),
    cardNumber: new UntypedFormControl(null),
    cardName: new UntypedFormControl(null),
  });
  fundAccounts = [];
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
    // this.payoutForm.patchValue(
    //   {
    //     "amount": 50,
    //     "description": "test",
    //     "name": "test",
    //     "email": "saptampro2003@gmail.com",
    //     "contact": "9517457296",
    //     "accountType": "vpa",
    //     "bankAccountName": null,
    //     "accountNumber": null,
    //     "ifsc": null,
    //     "vpa": "saptampro2003@gmail",
    //     "cardNumber": null,
    //     "cardName": null
    //   }
    // )
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
        .setValidators([Validators.required,Validators.pattern('^\d{9,18}$')]);
      this.payoutForm.get('ifsc').setValidators([Validators.required,Validators.pattern('^[A-Za-z]{4}\d{7}$')]);
    } else if (event.detail.value == 'vpa') {
      this.payoutForm.get('vpa').setValidators([Validators.required,Validators.email]);
    } else if (event.detail.value == 'card') {
      this.payoutForm
        .get('cardNumber')
        .setValidators([Validators.required,Validators.pattern('[0-9]{16}')]);
      this.payoutForm
        .get('cardName')
        .setValidators([Validators.required]);
    }
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

  makePayout() {
    const transaction: Transaction = {
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
        paymentType: this.payoutForm.value.paymentType,
      },
    };
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

  removeAccount() {}
}
