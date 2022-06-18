import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { UpiService } from '../services/upi.service';

@Component({
  selector: 'app-dth-recharge',
  templateUrl: './dth-recharge.page.html',
  styleUrls: ['./dth-recharge.page.scss'],
})
export class DthRechargePage implements OnInit {
  dthForm: FormGroup = new FormGroup({
    operator: new FormControl('', [Validators.required]),
    customerID: new FormControl('', [Validators.required]),
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
    this.databaseService.getDTHPayments().then((docs) => {
      this.recentPayments = [];
      docs.forEach((doc) => {
        this.recentPayments.push(doc.data());
      });
      console.log(this.recentPayments)
    });
  }

  submitDthForm() {
    this.upiService.details = {
      paymentFor: 'dth-recharge',
      ...this.dthForm.value,
    };
    this.router.navigate(['/upi-pin']);
  }
}
