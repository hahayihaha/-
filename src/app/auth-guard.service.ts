import { Injectable} from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {isNullOrUndefined} from 'util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (sessionStorage['UserID'] !== null && sessionStorage['UserID'] != undefined) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
