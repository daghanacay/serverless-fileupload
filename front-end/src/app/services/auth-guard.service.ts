import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from './security.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: SecurityService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isValid()) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          // set the 'return' parameter of url to current URL
          return: state.url
        }
      });
      return false;
    }
  }
}
