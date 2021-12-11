import { Injectable } from '@angular/core';
import { AccessToken } from './dtos/auth';
import { UserProfile } from './dtos/userProfile';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveAccessToken(accessToken: AccessToken) {
    sessionStorage.removeItem('ACCESS_TOKEN');
    sessionStorage.setItem('ACCESS_TOKEN', JSON.stringify(accessToken));
  }

  saveUserProfile(userProfile: UserProfile) {
    sessionStorage.removeItem('USER_PROFILE');
    sessionStorage.setItem("USER_PROFILE", JSON.stringify(userProfile))
  }

  returnAccessToken(): AccessToken | null {
    let accessTokenJson = sessionStorage.getItem('ACCESS_TOKEN');
    if(accessTokenJson != null) {
      return JSON.parse(accessTokenJson);
    } else {
      return null;
    }
  }

  returnUserProfile(): UserProfile | null {
    let userSessionJson = sessionStorage.getItem('USER_PROFILE');
    if(userSessionJson != null) {
      return JSON.parse(userSessionJson);
    } else {
      return null;
    }
  }
}
