import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../services/authentication.service';
import { LocationService } from '../../services/location.service';
import { AlertsAndNotificationsService } from '../../services/uiService/alerts-and-notifications.service';

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
  latitude: number;
  longitude: number;

  lpgForm: FormGroup = new FormGroup({
    operator: new FormControl('', [Validators.required]),
    canumber: new FormControl('', [Validators.required]),
    ad1: new FormControl(null),
    ad2: new FormControl(null),
    ad3: new FormControl(null),
  });

  constructor(
    private alertService: AlertsAndNotificationsService,
    private router: Router,
    private authService: AuthenticationService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    // Get location
    this.locationService.getLatitudeAndLongitude().then((response) => {
      if (response.status) {
        this.latitude = response.latitude;
        this.longitude = response.longitude;
      } else {
        this.alertService.presentToast(response.message);
        this.router.navigate(['/homepage']);
      }
    });

    // Get Operators
    this.authService.user.subscribe((user) => {
      if (user) {
        this.authService.getIdToken(user).then((userToken) => {
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');
          let data = JSON.stringify({
            token: userToken,
            uid: user.uid,
          });
          var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow',
          };
          fetch(environment.serverBaseUrl + '/getLpgOperators', requestOptions)
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
            })
            .catch((error) => console.log('error', error));
        });
      }
    });
  }

  onOperatorSelect(event: Event) {
    const operatorId = event.target['value'];
    if (operatorId) {
      this.operator = this.operators.find((op) => op.id === operatorId);
      if (this.operator) {
        // Set RegExp validator in canumber
        if (this.operator.regex) {
          const regex = new RegExp(this.operator.regex);
          this.lpgForm.controls.canumber.setValidators([
            Validators.required,
            Validators.pattern(regex),
          ]);
          this.lpgForm.controls.canumber.updateValueAndValidity();
        }

        // If additional details' regex is given, set that
        for (var i = 1; i <= 3; i++) {
          if (this.operator[`ad${i}_regex`]) {
            const regex = new RegExp(this.operator[`ad${i}_regex`]);
            this.lpgForm.controls[`ad${i}`].setValidators([
              Validators.required,
              Validators.pattern(regex),
            ]);
          } else {
            this.lpgForm.controls[`ad${i}`].setValidators(null);
          }
          this.lpgForm.controls[`ad${i}`].updateValueAndValidity();
        }
      }
    }
  }

  async submitLpgForm() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.authService.getIdToken(user).then((userToken) => {
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');
          let data = JSON.stringify({
            token: userToken,
            uid: user.uid,
            customerNumber: this.lpgForm.get('canumber').value,
            operatorNumber: this.lpgForm.get('operator').value,
          });
          var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow',
          };
          fetch(environment.serverBaseUrl + '/fetchLpgDetails', requestOptions)
            .then((response) => {
              return response.json();
            })
            .then((json) => {
              if (json.status) {
                this.lpgFormSubmitted = true;
                this.customerName = json.name;
                this.amount = json.amount;
              } else {
                this.alertService.presentToast(json.message);
                this.router.navigate(['/homepage']);
              }
            })
            .catch((error) => console.log('error', error));
        });
      }
    });
  }

  recharge() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.authService.getIdToken(user).then((userToken) => {
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');
          let data = JSON.stringify({
            token: userToken,
            uid: user.uid,
            customerNumber: this.lpgForm.get('canumber').value,
            operatorNumber: this.lpgForm.get('operator').value,
            amount: this.amount,
            ad1: this.lpgForm.get('ad1').value,
            ad2: this.lpgForm.get('ad2').value,
            ad3: this.lpgForm.get('ad3').value,
            referenceId:
              this.operator.id +
              new Date().getTime() +
              Math.floor(Math.random() * 100),
            latitude: this.latitude,
            longitude: this.longitude,
          });
          var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow',
          };
          fetch(environment.serverBaseUrl + '/lpgRecharge', requestOptions)
            .then((response) => {
              return response.json();
            })
            .then((json) => {
              console.log(json);
            })
            .catch((error) => console.log('error', error));
        });
      }
    });
  }
}
