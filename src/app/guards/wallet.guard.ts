import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataProvider } from '../providers/data.provider';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';

@Injectable({
  providedIn: 'root'
})
export class WalletGuard implements CanActivate {
  constructor(private dataProvider:DataProvider,private alertify:AlertsAndNotificationsService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.dataProvider.wallet){
        if (this.dataProvider.wallet?.balance > 0){
          return true;
        } else {
          this.alertify.presentToast("You don't have enough balance to withdraw");
          return false;
        }
      } else {
        this.alertify.presentToast("You don't have a wallet. You can create one from the wallet page");
        return false;
      }
  }
  
}
