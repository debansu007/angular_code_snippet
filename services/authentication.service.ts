import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { BASE_URL, TOKEN_KEY } from '../../environments/environment';
import { API_POST_LOGIN, API_POST_SIGNUP, API_POST_RESET_PASSWORD } from '../constants';
import { UserService } from './user.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private dataServ: DataService,
  ) {
    this.checkToken();
  }

  checkToken() {
    if (localStorage.getItem(TOKEN_KEY)) {
    this.authenticationState.next(true);
    }
  }

  getHeaders() {
    let header = {
      'Content-Type': 'application/json',
    };
    return header;
  }

  login(body) {
    const url = `${BASE_URL}${API_POST_LOGIN}`;
    return this.http.post(url, body, { headers: this.getHeaders() });
  }

  logout() {
    this.userService.clearUserToken();
    this.clearDataService();
    this.authenticationState.next(false);
  }

  clearDataService() {
    this.dataServ.change(null);
    this.dataServ.changeList(null);
    this.dataServ.changeUserData(null);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  doSignup(body) {
    const url = `${BASE_URL}${API_POST_SIGNUP}`;
    return this.http.post(url, body);
  }

  resetPassword(body) {
    const url = `${BASE_URL}${API_POST_RESET_PASSWORD}`;
    return this.http.post(url, body, { headers: this.getHeaders() });
  }
}
