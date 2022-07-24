import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FastagService } from 'src/app/services/fastag.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-select-operator',
  templateUrl: './select-operator.page.html',
  styleUrls: ['./select-operator.page.scss'],
})
export class SelectOperatorPage implements OnInit {
  operators: any[];

  constructor(
    private alertService: AlertsAndNotificationsService,
    private router: Router,
    public fastagService: FastagService
  ) {}

  ngOnInit() {
    fetch('assets/operators.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.response_code == 1) {
          this.operators = json.data;
        } else {
          this.alertService.presentToast(json.message);
          this.router.navigate(['/homepage']);
        }
      });
  }
}
