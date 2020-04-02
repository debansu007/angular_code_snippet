import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authState: any = null;

  /**
   * @constructor{{DI will be pushed here}}
   */
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.authService.authState) {
      this.router.navigate(['login']);
      return false;
    }
    else {
      return true;
    }
    
  }

}
