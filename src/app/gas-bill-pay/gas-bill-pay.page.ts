import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-gas-bill-pay',
  templateUrl: './gas-bill-pay.page.html',
  styleUrls: ['./gas-bill-pay.page.scss'],
})
export class GasBillPayPage implements OnInit {
  operators: any[];
  @ViewChild('operatorSelect') operatorSelect: ElementRef;
  operator: any;
  customerName: any;
  amount: any;
  lpgFormSubmitted: boolean = false;

  lpgForm: FormGroup = new FormGroup({
    operator: new FormControl('', [Validators.required]),
    canumber: new FormControl('', [Validators.required]),
  });

  constructor(
    private alertService: AlertsAndNotificationsService,
    private router: Router
  ) {}

  async ngOnInit() {
    await fetch('/assets/operators.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.status) {
          this.operators = json.data;
          this.operators.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        } else {
          this.alertService.presentToast(json.message);
          this.router.navigate(['/homepage']);
        }
      });
  }

  onOperatorSelect(event: Event) {
    const operatorId = event.target['value'];
    if (operatorId) {
      this.operator = this.operators.find((op) => op.id === operatorId);
      if (this.operator) {
        if (this.operator.regex) {
          const regex = new RegExp(this.operator.regex);
          this.lpgForm.controls.canumber.setValidators([
            Validators.required,
            Validators.pattern(regex),
          ]);
          this.lpgForm.controls.canumber.updateValueAndValidity();
        }
      }
    }
  }

  async submitLpgForm() {
    await fetch('assets/details.json')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (json.status) {
          this.lpgFormSubmitted = true;
          this.customerName = json.name;
          this.amount = json.amount;
        }
        else {
          this.alertService.presentToast(json.message);
          this.router.navigate(['/homepage']);
        }
      });
  }
}
