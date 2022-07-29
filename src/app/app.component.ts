import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { DatabaseService } from './services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import { registerPlugin } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { DataProvider } from './providers/data.provider';
import { Contacts, PermissionStatus } from '@capacitor-community/contacts'
import { AlertsAndNotificationsService } from './services/uiService/alerts-and-notifications.service';


export interface RdServicePlugin {
  getDeviceInfo(): Promise<{ value: string }>;
  getFingerPrint(): Promise<{ fingerprint: string }>;
}
const RdService = registerPlugin<RdServicePlugin>('RdService');
export default RdService;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  noHeaders = [
    'login',
    'register',
    'forgot-password',
    'reset-password',
    'verify-email'
  ]
  showHeaders:boolean = false;
  constructor(
    private authService: AuthenticationService,
    private platform: Platform,
    private databaseService: DatabaseService,
    private router: Router,
    public dataProvider: DataProvider,
    private alertify:AlertsAndNotificationsService
  ) {
    this.router.events.subscribe((val) => {
      this.showHeaders = !this.noHeaders.includes(window.location.pathname.replace('/', ''));
      // console.log("changed",this.showHeaders);
    })
    if (!this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        GoogleAuth.initialize({
          clientId:
            '1044964269542-uhumgrlgrfgr6mp2gc0gpctudta4eiad.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        });
      })
    } else if (this.platform.is('capacitor')) {
      Contacts.getPermissions().then((permission:PermissionStatus)=>{
        if(permission.granted){
          this.alertify.presentToast('Permission granted');
        }else{
          this.alertify.presentToast('Permission denied');
        }
      })
    }
    this.authService.user.subscribe((user) => {
      if (user) {
        this.databaseService.getUser(user.uid).then((user) => {
          SplashScreen.hide();
          this.router.navigate(['homepage']);
        });
      } else {
        SplashScreen.hide();
        if (environment.production){
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['homepage']);
        }
      }
    });
  }
  async ngOnInit() {
    // if (this.platform.is('capacitor')) {
    //   alert('Starting timer for checker');
    //   setTimeout(async () => {
    //     alert('Started');
    //     const { value } = await RdService.getDeviceInfo();
    //     alert('Response from native:' + value);
    //     setTimeout(async ()=>{
    //       const { fingerprint } = await RdService.getFingerPrint();
    //       alert('Response from fingerprint:' + fingerprint);
    //     },5000)
    //   }, 5000);
    // }
  }
}
