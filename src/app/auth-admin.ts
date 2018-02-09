import { Injectable} from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthAdmin implements CanActivate {
  constructor( private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkAdmin(url);
  }

  checkAdmin(url: string): boolean {
    if (sessionStorage['Qx'] == 0) {
      return true;
    }

    this.router.navigate(['/users'])

    return false;
  }
}
