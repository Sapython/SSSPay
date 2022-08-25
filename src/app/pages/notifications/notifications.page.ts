import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  constructor(private notificationService: NotificationService,private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService) {}
  notifications:any[] = []
  ngOnInit() {
    this.databaseService.getNotifications().then((data)=>{
      this.notifications = [];
      data.forEach((doc)=>{
        this.notifications.push({...doc.data(),id:doc.id});
      })
      console.log("notifications",this.notifications);
    })
  }

  refreshNotification() {
    this.notificationService.checkPermissions();
    this.ngOnInit();
  }
  delete(event: any) {
    this.databaseService.deleteNotification(event.id).then((doc)=>{
      this.alertify.presentToast("Notification deleted successfully");
    }).catch((err)=>{
      this.alertify.presentToast("Error deleting notification");
    })
    this.ngOnInit();
  }
}
