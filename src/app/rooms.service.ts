import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomsResponse } from './dtos/room';
import { Observable } from 'rxjs';
import { AccessToken } from './dtos/auth';
import { UserProfile } from './dtos/userProfile';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private baseUrl: string = "http://localhost:8080/api/rooms"

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  getRoomsForExplore(): Observable<RoomsResponse>{
    var exploreRoute = this.baseUrl + "/explore?size=20"
    
    return this.httpClient.get<RoomsResponse>(exploreRoute)
  }

  getCurrentUserRooms(): Observable<RoomsResponse>{
    var currentUserRoomsRoute = this.baseUrl + "/current-user-rooms?limit=20"
    let accessToken: AccessToken | null = this.storageService.returnAccessToken();
    let userProfile: UserProfile | null  = this.storageService.returnUserProfile();

    if(accessToken == null || userProfile == null){
      throw "empty access token or session"
    }

    let httpParams = new HttpParams().append('tokenKey', accessToken.tokenKey)
    .append('userId', userProfile.id)
    
    return this.httpClient.get<RoomsResponse>(currentUserRoomsRoute, {params: httpParams})
  } 
}
