import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { GetAuthUrlResponse, GetAccessTokenRequest, AccessToken, RefreshAccessTokenRequest } from 'src/app/dtos/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = "http://127.0.0.1:8081/spotify-auth-adapter"

  REDIRECT_URL = "http://localhost:36329/login"

  getAuthUrl(): Observable<GetAuthUrlResponse> {
    let httpParams = new HttpParams().append('redirectUri', this.REDIRECT_URL)
    return this.httpClient.get<GetAuthUrlResponse>(`${this.BASE_URL}/auth-url`, {params: httpParams})
  }

  getAccessToken(requestBody: GetAccessTokenRequest): Observable<AccessToken> {
    return this.httpClient.post<AccessToken>(`${this.BASE_URL}/access-token`, {
      authToken: requestBody.authToken,
      redirectUri: requestBody.redirectUri
    })
  }

  refreshToken(requestBody: RefreshAccessTokenRequest): Observable<AccessToken> {
    return this.httpClient.post<AccessToken>(`${this.BASE_URL}/refresh-access-token`, {
      refreshToken: requestBody.refreshToken
    })
  }
}
