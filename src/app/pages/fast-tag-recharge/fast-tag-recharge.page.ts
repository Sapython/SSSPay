import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { LocationService } from 'src/app/services/location.service';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-fast-tag-recharge',
  templateUrl: './fast-tag-recharge.page.html',
  styleUrls: ['./fast-tag-recharge.page.scss'],
})
export class FastTagRechargePage implements OnInit {
public banks=[]
  constructor(
    private alertService: AlertsAndNotificationsService,
    private router: Router,
    private dataProvider: DataProvider,
    private locationService: LocationService,
    private serverService:ServerService,
    private transactionService:TransactionService
  ) { }

  ngOnInit() {
    
  }

}
