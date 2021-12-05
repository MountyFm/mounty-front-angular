import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomsResponse } from './dtos/room';
import { Observable } from 'rxjs';
import { AccessToken } from './dtos/auth';
import { UserProfile } from './dtos/userProfile';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private baseUrl: string = "http://localhost:8080/api/rooms"

  constructor(private httpClient: HttpClient) { }

  getRoomsForExplore(): Observable<RoomsResponse>{
    var exploreRoute = this.baseUrl + "/explore?size=20"
    
    return this.httpClient.get<RoomsResponse>(exploreRoute)
  }

  getCurrentUserRooms(): Observable<RoomsResponse>{
    var currentUserRoomsRoute = this.baseUrl + "/current-user-rooms?limit=20"
    let accessTokenJson = sessionStorage.getItem("ACCESS_TOKEN");
    let userSessionJson = sessionStorage.getItem("USER_PROFILE");

    if(accessTokenJson == null || userSessionJson == null){
      throw "empty access token or session"
    }

    let accessToken: AccessToken = JSON.parse(accessTokenJson)

    let userProfile: UserProfile = JSON.parse(userSessionJson)
    
    return this.httpClient.get<RoomsResponse>(currentUserRoomsRoute, {params: {
      tokenKey: accessToken.tokenKey,
      userId: userProfile.id
    }})
  } 
}
