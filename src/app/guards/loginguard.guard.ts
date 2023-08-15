import { DataProvider } from './../providers/data.provider';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginguardGuard implements CanActivate {
  constructor(private dataProvider: DataProvider,private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      // console.log('LoginguardGuard',this.dataProvider.loggedIn);
    if(this.dataProvider.loggedIn){
      return true;
    } else {
      if (!environment.production){
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }
  }
}
