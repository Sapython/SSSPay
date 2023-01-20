import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';

@Injectable({
  providedIn: 'root'
})
export class GroupGuardGuard implements CanActivate {
  constructor(private dataProvider:DataProvider,private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.allowMemberAccess() && (this.dataProvider.userData?.ownerId || this.dataProvider.userData?.access.access=='admin')){
      return true
    } else {
      this.router.navigate(['homepage'])
      return false
    }
  }
  access = [
    'admin',
    'superDistributor',
    'masterDistributor',
    'distributor'
  ];
  allowMemberAccess(){return this.access.includes(this.dataProvider.userData?.access.access)}
  
}
