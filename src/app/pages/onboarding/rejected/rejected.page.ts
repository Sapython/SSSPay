import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.page.html',
  styleUrls: ['./rejected.page.scss'],
})
export class RejectedPage implements OnInit {

  constructor(private databaseService:DatabaseService,private router:Router,private alertify:AlertsAndNotificationsService) { }

  ngOnInit() {
  }
  resetCurrentApproval(){
    this.databaseService.resetVerification().then(()=>{
      this.alertify.presentToast('Your KYC request got reset successfully.Please start onboarding again.','info',7000);
      this.router.navigate(['../onboarding/aadhaar']);
    }).catch(()=>{
      this.alertify.presentToast('Something went wrong. Please try again later.','error',3000);
    });
  }
}
