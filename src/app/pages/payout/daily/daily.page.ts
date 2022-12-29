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
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {
  addPayoutDetailForm: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl(
      this.dataProvider.userData.primaryPayoutAccount?.name ||
        this.dataProvider.userData.displayName,
      [Validators.required]
    ),
    email: new UntypedFormControl(
      this.dataProvider.userData.primaryPayoutAccount?.email ||
        this.dataProvider.userData.email,
      [Validators.required]
    ),
    contact: new UntypedFormControl(
      this.dataProvider.userData.primaryPayoutAccount?.contact ||
        this.dataProvider.userData.phoneNumber,
      [Validators.required]
    ),
    accountType: new UntypedFormControl(
      this.dataProvider.userData.primaryPayoutAccount?.accountType,
      [Validators.required]
    ),
    bankAccountName: new UntypedFormControl(
      this.dataProvider.userData.primaryPayoutAccount?.bankAccountName
    ),
    accountNumber: new UntypedFormControl(
      this.dataProvider.userData.primaryPayoutAccount?.accountNumber
    ),
    ifsc: new UntypedFormControl(
      this.dataProvider.userData.primaryPayoutAccount?.ifsc
    ),
    vpa: new UntypedFormControl(this.dataProvider.userData.primaryPayoutAccount?.vpa),
    cardNumber: new UntypedFormControl(
      this.dataProvider.userData.primaryPayoutAccount?.cardNumber
    ),
    cardName: new UntypedFormControl(
      this.dataProvider.userData.primaryPayoutAccount?.cardName
    ),
  });
  addingAccount: boolean = false;
  payoutForm: UntypedFormGroup = new UntypedFormGroup({
    amount: new UntypedFormControl(null, [
      Validators.required,
      Validators.max(this.dataProvider.wallet.balance),
      Validators.min(0),
    ]),
    account: new UntypedFormControl(null, [Validators.required]),
    description: new UntypedFormControl(null, [Validators.required]),
    paymentType: new UntypedFormControl(null),
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
  }

  changeControl(event) {
    if (event.detail.value == 'bank_account') {
      this.addPayoutDetailForm
        .get('bankAccountName')
        .setValidators([Validators.required]);
      this.addPayoutDetailForm
        .get('accountNumber')
        .setValidators([Validators.required]);
      this.addPayoutDetailForm.get('ifsc').setValidators([Validators.required]);
    } else if (event.detail.value == 'vpa') {
      this.addPayoutDetailForm.get('vpa').setValidators([Validators.required]);
    } else if (event.detail.value == 'card') {
      this.addPayoutDetailForm
        .get('cardNumber')
        .setValidators([Validators.required]);
      this.addPayoutDetailForm
        .get('cardName')
        .setValidators([Validators.required]);
    }
  }

  setControls() {
    if (this.payoutForm.value.account.accountType === 'bank_account') {
      this.payoutForm.get('paymentType').addValidators([Validators.required]);
      this.payoutForm.value.paymentType = 'imps';
    } else {
      this.payoutForm
      .get('paymentType')
      .removeValidators([Validators.required]);
      this.payoutForm.value.paymentType = 'vpa';
    }
    return
  }

  makePayout() {
    const transaction: Transaction = {
      groupId:this.dataProvider.userData?.groupId || null,
      serviceType:this.payoutForm.value.paymentType =='vpa'? 'payoutUPI' : 'payoutImps',
      amount: Number(this.payoutForm.get('amount').value),
      date: new Date(),
      type: 'dailyPayout',
      description: 'Payout: ' + this.payoutForm.value.description,
      balance: this.dataProvider.wallet.balance,
      idempotencyKey: this.generateIdemPotencyKey(),
      completed: false,
      status: 'started',
      error: null,
      receiver:'SSSPay Payout',
      extraData: {
        ...this.payoutForm.value,
        customerId: this.dataProvider.userData.userId,
        accountType: this.payoutForm.value.account.accountType,
        paymentType:this.payoutForm.value.paymentType =='vpa'? 'UPI' :this.payoutForm.value.paymentType,
        dailyPayoutTime:this.dataProvider.userData.dailyPayoutTime || null
      },
    };
    this.transactionService.addTransaction(transaction).then(async (docRef) => {
      console.log('transactionAdded',docRef.id,docRef);
      await this.serverService.makeExpressPayout(docRef.id);
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

  submitForm() {
    console.log(this.addPayoutDetailForm.value);
    if (this.addPayoutDetailForm.valid) {
      const data: any = {};
      this.addingAccount = true;
      if (this.addPayoutDetailForm.value.accountType == 'bank_account') {
        data['bankAccountName'] =
          this.addPayoutDetailForm.value.bankAccountName;
        data['accountNumber'] = this.addPayoutDetailForm.value.accountNumber;
        data['ifsc'] = this.addPayoutDetailForm.value.ifsc;
      } else if (this.addPayoutDetailForm.value.accountType == 'vpa') {
        data['vpa'] = this.addPayoutDetailForm.value.vpa;
      } else if (this.addPayoutDetailForm.value.accountType == 'card') {
        data['cardNumber'] = this.addPayoutDetailForm.value.cardNumber;
        data['cardName'] = this.addPayoutDetailForm.value.cardName;
      } else {
        this.alertify.presentToast('Please select a valid account type');
        this.addingAccount = false;
        return;
      }
      data['name'] = this.addPayoutDetailForm.value.name;
      data['email'] = this.addPayoutDetailForm.value.email;
      data['contact'] = this.addPayoutDetailForm.value.contact;
      data['accountType'] = this.addPayoutDetailForm.value.accountType;
      console.log(data);
      this.databaseService
        .addFundAccount(data)
        .then(() => {
          this.ngOnInit();
          this.alertify.presentToast('Payout account added successfully');
          this.addingAccount = false;
        })
        .catch(() => {
          this.alertify.presentToast('Error adding payout account');
        });
    } else {
      this.alertify.presentToast('Please fill all the required fields');
    }
  }

  removeAccount() {}
}
