import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FastagService } from 'src/app/services/fastag.service';
import { LocationService } from 'src/app/services/location.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsPage implements OnInit {
  latitude: number;
  longitude: number;

  constructor(
    public fastagService: FastagService,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertsAndNotificationsService,
    private locationService: LocationService
  ) {
    if (
      !this.fastagService.operatorSelected ||
      !this.fastagService.canumber ||
      !this.fastagService.details
    ) {
      this.router.navigate(['/homepage']);
    }
  }

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
  }

  toTitleCase(str: string) {
    const words = str.split(' ');
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].trim();
      if (words[i].length > 0) {
        words[i] =
          words[i].charAt(0).toUpperCase() +
          (words[i].length > 1 ? words[i].slice(1).toLowerCase() : '');
      }
    }
    return words.join(' ');
  }

  getDateName(date: string) {
    const dateObj = new Date(date);
    const dateName =
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][dateObj.getMonth()] +
      ' ' +
      dateObj.getDate() +
      ', ' +
      dateObj.getFullYear();

    if (dateObj < new Date()) {
      return `<span class="danger-text">${dateName}</span>`;
    }
    return dateName;
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
            operator: this.fastagService.operatorSelected.id,
            canumber: this.fastagService.canumber,
            amount: this.fastagService.details.amount,
            referenceid:
              this.fastagService.operatorSelected.id +
              new Date().getTime() +
              Math.floor(Math.random() * 100),
            latitude: this.latitude,
            longitude: this.longitude,
            bill_fetch: this.fastagService.details.bill_fetch,
          });
          var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow',
          };
          fetch(environment.serverBaseUrl + '/', requestOptions)
            .then((response) => {
              return response.json();
            })
            .then((json) => {
              if (json.response_code == 1) {
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
}
