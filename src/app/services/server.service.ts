import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(
    private authService: AuthenticationService,
    private alertify: AlertsAndNotificationsService
  ) {}

  checkAuth() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.authService.getIdToken(user).then((userToken) => {
          console.log('UserToken', userToken, user.uid);
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
          fetch(environment.serverBaseUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              if (result.error) {
                this.alertify.presentToast(result.error, 'error');
              } else {
                this.alertify.presentToast('Login Successful', 'info');
              }
            })
            .catch((error) => console.log('error', error));
        });
      }
    });
  }
}
