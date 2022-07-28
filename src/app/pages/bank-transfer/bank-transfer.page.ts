import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpiService } from '../../services/upi.service';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.page.html',
  styleUrls: ['./bank-transfer.page.scss'],
})
export class BankTransferPage implements OnInit {
  bankTransferForm: UntypedFormGroup = new UntypedFormGroup({
    accountNo: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9 ]*$/),
    ]),
    confirmAccountNo: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9 ]*$/),
    ]),
    accountName: new UntypedFormControl('', [Validators.required]),
    issccode: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9 ]*$/),
    ]),
    mobileno: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^(\+|)[0-9 ]*$/),
    ]),
    amount: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
    ]),
  });

  recentPayments: any[];

  constructor(private upiService: UpiService, private router: Router) {}

  ngOnInit() {}

  submitAepsForm() {
    this.upiService.details = {
      paymentFor: 'bank-transfer',
      ...this.bankTransferForm.value,
    };
    console.log(this.upiService.details);
    this.router.navigate(['/upi-pin']);
  }
}
