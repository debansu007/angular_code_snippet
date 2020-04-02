import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  authState: any = null;

   /**
   * @constructor{{DI will be pushed here}}
   */
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.authState) {
      return true;
    }
    else {
      this.router.navigate(['calendar']);
      return false;
    }

  }

}
