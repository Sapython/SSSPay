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
  banks: any[];

  aepsForm: FormGroup = new FormGroup({
    mobilenumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]*/),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    adhaarnumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]*/),
      Validators.minLength(12),
      Validators.maxLength(12),
    ]),
    bank: new FormControl('', [Validators.required]),
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
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.databaseService.getBanks().then((docs) => {
      this.banks = [];
      docs.forEach((doc) => {
        this.banks.push(doc.data());
      });
    });
  }

  submitAepsForm() {
    this.upiService.details = {
      paymentFor: 'aeps',
      ...this.aepsForm.value,
    };
    console.log(this.upiService.details);
    this.router.navigate(['/upi-pin']);
  }
}
