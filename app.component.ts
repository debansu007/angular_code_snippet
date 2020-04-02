import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  /**
   * @constructor{{DI will be pushed here}}
   */
  constructor(
    private authService: AuthenticationService
  ) { }

  /**
   * @function{{menuClose}}
   * @description{{menu close function}}
   */
  menuClose() {
    this.authService.menuClose();
  }

  /**
   * @function{{getUsername}}
   * @description{{get username function}}
   */
  getUsername() {
    if(localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).name;
    }
    else {
      return '';
    }
  }

}
