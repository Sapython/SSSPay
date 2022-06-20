import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { DatabaseService } from './services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthenticationService,private databaseService:DatabaseService,private router:Router) {
    this.authService.user.subscribe(user=>{
      if (user){
        this.databaseService.getUser(user.uid).then(user=>{
          SplashScreen.hide();
            this.router.navigate(['']);
        })
        // this.router.navigate(['/admin']);
      } else {
        SplashScreen.hide();
        this.router.navigate(['/login'])
      }
    })
  }
}
