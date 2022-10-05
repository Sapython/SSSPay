import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AuthenticationService } from './services/authentication.service';
import { UserDataService } from './services/user-data.service';
import { DataProvider } from './providers/data.provider';
import { DatabaseService } from './services/database.service';
import { AlertsAndNotificationsService } from './services/uiService/alerts-and-notifications.service';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { ServerService } from './services/server.service';
import { enterAnimation, pageTransition } from './animation';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotificationService } from './services/notification.service';
import { MemberManagementService } from './services/member-management.service';
import { WaitForQrPaymentComponent } from './wait-for-qr-payment/wait-for-qr-payment.component';
import { PromptComponent } from './prompt/prompt.component';
@NgModule({   
    declarations: [AppComponent,WaitForQrPaymentComponent,PromptComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot({ animated: true,navAnimation: pageTransition }),
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAnalytics(() => getAnalytics()),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideFunctions(() => getFunctions()),
        provideStorage(() => getStorage()),
        provideMessaging(() => getMessaging()),
        providePerformance(() => getPerformance()),
        ServiceWorkerModule.register('firebase-messaging-sw.js', {
          enabled: true,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:3000'
        }),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        ScreenTrackingService,
        UserTrackingService,
        AuthenticationService,
        UserDataService,
        DataProvider,
        DatabaseService,
        AlertsAndNotificationsService,
        Geolocation,
        ServerService,
        NotificationService,
        MemberManagementService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
