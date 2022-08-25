import { Injectable } from '@angular/core';
import {
  Firestore,
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
} from '@angular/fire/firestore';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { DataProvider } from '../providers/data.provider';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  messaging;
  constructor(
    private firestore: Firestore,
    private dataProvider: DataProvider,
    private alertify: AlertsAndNotificationsService,
    private updates: SwUpdate,
    private push: SwPush
  ) {
    if ('serviceWorker' in navigator && navigator.serviceWorker) {
      this.messaging = getMessaging();
      this.startObserver();
      navigator.serviceWorker
        .register('./firebase-messaging-sw.js')
        .then((registration) => {
          // console.log('Registration successful, scope is:', registration.scope);
        })
        .catch((error: any) => {
          // console.log(error);
          
        });
    }
  }

  startNotificationService() {
    // console.log(
    //   'startNotificationService',
    //   this.dataProvider.userData?.messageToken
    // );
    if (this.dataProvider.userData?.messageToken == undefined) {
      // console.log('startNotificationService', navigator.serviceWorker);
      // alert('Starting notification service');
      navigator.serviceWorker.register('firebase-messaging-sw.js');
      navigator.serviceWorker.getRegistration().then((registration) => {
        // console.log('navigator.serviceWorker.ready', registration);
        // alert('navigator.serviceWorker.ready');
        getToken(this.messaging, {
          vapidKey:
            'BFjeUfQ6Oc2Th6nKpXLWxHj9wGD98f1d4ETsv0oJYnfSfg2TO3Yvt14DwRkUW1Ucoje7xFx6_qRU5kqBw1AgvdE',
          serviceWorkerRegistration: registration,
        })
          .then((token) => {
            // console.log('TOKEN', token);
            if (token) {
              if (this.dataProvider.userData?.userId) {
                this.updateUserMessageToken(
                  this.dataProvider.userData.userId,
                  token
                )
                  .then(() => {
                    // this.alertify.presentToast('Notification Are Enabled');
                  })
                  .catch((err) => {
                    // console.log(err);
                    // alert('Error occurred cannot activate notifications');
                  });
              }
            } else {
              Notification.requestPermission().then((permission) => {
                // console.log(permission);
                if (permission === 'granted') {
                  // this.alertify.presentToast('Permission granted');
                } else {
                  this.alertify.presentToast('Permission denied');
                }
              });
            }
          })
          .catch((err) => {
            // console.log(err);
            // alert('Error occurred cannot activate notifications');
          });
      });
    }
  }
  updateUserMessageToken(userId: string, messageToken: string) {
    return updateDoc(doc(this.firestore, 'users/' + userId), {
      messageToken: arrayUnion(messageToken),
    });
  }

  checkPermissions() {
    Notification.requestPermission()
      .then((permission) => {
        // console.log(permission);
        if (permission !== 'granted') {
          this.alertify.presentToast('Permission denied');
        }
      })
      .catch((error) => {
        // console.log('Check Permissions Error Occurred', error);
        this.alertify.presentToast('Error occurred','error');
      });
  }
  startObserver() {
    onMessage(this.messaging, (payload) => {
      alert('Message: ' + payload);
    });
    this.push.messages.subscribe((msg) => console.log('push message', msg));
  }
}
