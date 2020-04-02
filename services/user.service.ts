import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';
import { API_POST_PROFILE_DATA, API_GET_MATCH_DATA, API_POST_FAVORITE, API_GET_CHAT, API_CHAT_TIME, API_POST_FAVORITE_STATUS, API_POST_USER_DATA, API_POST_USER_IMAGE, API_POST_MAP_DISTANCE, API_POST_EXTERNAL_NETWORK, API_POST_SOCIAL_LINK, API_POST_DELETE_ACCOUNT, API_POST_CONTACT, API_GET_USER, API_POST_INCOGNITO, API_MEET, API_SOCIAL_LOGIN, API_GET_FLAGED, API_POST_FLAG_MESSAGE } from '../constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  token = null;
  user = null;

  constructor(
    private http: HttpClient
  ) { }

  get authToken() {
    return this.token;
  }

  getHeaders() {
    let header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken
    };
    return header;
  }

  get authUser() {
    return this.user;
  }

  setAuthToken(token) {
    this.token = token;
  }

  setAuthUser(user) {
    this.user = user;
  }

  clearUserToken() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('USER_KEY');
  }

  getUserDetails() {
    const url = `${BASE_URL}${API_POST_PROFILE_DATA}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  postProfileData(body) {
    const url = `${BASE_URL}${API_POST_PROFILE_DATA}`;
    return this.http.post(url, body, { headers: this.getHeaders() });
  }

  getMatchData(body) {
    const url = `${BASE_URL}${API_GET_MATCH_DATA}?lat=${body.lat}&lng=${body.lng}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  postAddFavorite(body) {
    const url = `${BASE_URL}${API_POST_FAVORITE}`;
    return this.http.post(url, body, { headers: this.getHeaders() });
  }

  postDeleteFavorite(id) {
    const url = `${BASE_URL}${API_POST_FAVORITE}` + "/" + id;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  postIncognito(formData) {
    const url = `${BASE_URL}${API_POST_INCOGNITO}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.authToken
    });
    return this.http.post(url, formData.set('location_visibility', "true"), { headers: headers });
  }

}
