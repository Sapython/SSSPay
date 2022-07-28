import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';
import { FastagService } from 'src/app/services/fastag.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-enter-canumber',
  templateUrl: './enter-canumber.page.html',
  styleUrls: ['./enter-canumber.page.scss'],
})
export class EnterCanumberPage implements OnInit {
  canumberForm: UntypedFormGroup = new UntypedFormGroup({
    canumber: new UntypedFormControl(''),
  });

  constructor(
    public fastagService: FastagService,
    private alertService: AlertsAndNotificationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (!this.fastagService.operatorSelected) {
      this.router.navigate(['/homepage']);
    }
  }

  ngOnInit() {
    if (this.fastagService.operatorSelected.regex) {
      const regex = new RegExp(this.fastagService.operatorSelected.regex);
      this.canumberForm.controls.canumber.setValidators([
        Validators.required,
        Validators.pattern(regex),
      ]);
    } else {
      this.canumberForm.controls.canumber.setValidators([Validators.required]);
    }
    this.canumberForm.controls.canumber.updateValueAndValidity();
  }

  submit() {
    this.fastagService.canumber = this.canumberForm.get('canumber').value;
    fetch('assets/details.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.response_code == 1) {
          this.fastagService.details = {
            amount: json.amount,
            name: json.name,
            duedate: json.duedate,
            bill_fetch: json.bill_fetch,
          };
          this.router.navigate(['../details'], { relativeTo: this.route });
        } else {
          this.alertService.presentToast(json.message);
          this.router.navigate(['/homepage']);
        }
      });
  }
}
