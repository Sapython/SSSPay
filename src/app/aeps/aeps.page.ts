import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { UpiService } from '../services/upi.service';

@Component({
  selector: 'app-aeps',
  templateUrl: './aeps.page.html',
  styleUrls: ['./aeps.page.scss'],
})
export class AepsPage implements OnInit {
  aepsForm: FormGroup = new FormGroup({
    adharNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9 ]*/),
    ]),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/(\+|)[0-9 ]*/),
    ]),
    bank: new FormControl('', [
      Validators.required,
    ]),
    accountNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9 ]*/),
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]*/),
    ]),
  });

  recentPayments: any[];

  constructor(
    private upiService: UpiService,
    private router: Router,
  ) {}

  ngOnInit() {}

  submitAepsForm() {
    this.upiService.details = {
      paymentFor: 'aeps',
      ...this.aepsForm.value,
    };
    console.log( this.upiService.details );
    this.router.navigate(['/upi-pin']);
  }
}
