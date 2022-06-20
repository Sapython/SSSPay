import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpiService } from '../services/upi.service';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.page.html',
  styleUrls: ['./bank-transfer.page.scss'],
})
export class BankTransferPage implements OnInit {
  bankTransferForm: FormGroup = new FormGroup({
    accountNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9 ]*$/),
    ]),
    confirmAccountNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9 ]*$/),
    ]),
    accountName: new FormControl('', [Validators.required]),
    issccode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9 ]*$/),
    ]),
    mobileno: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\+|)[0-9 ]*$/),
    ]),
    amount: new FormControl('', [
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
