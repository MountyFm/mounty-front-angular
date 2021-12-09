import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import {UserProfile, UserProfileResponse} from './dtos/userProfile'

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = "http://127.0.0.1:8080/api/profile"

  addOrGetUserProfile(tokenKey: string) {
    return this.httpClient.post<UserProfileResponse>(`${this.BASE_URL}/new`, {
      tokenKey: tokenKey
    })
  }

  getUserProfileById(id: string) {
    return this.httpClient.get<UserProfileResponse>(`${this.BASE_URL}/id/${id}`)
  }
}
