import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from './dtos/userProfile';
import { GetCurrentlyPlayingTrackResponse } from './dtos/track';
import { AccessToken } from './dtos/auth';

const PLAYER_URL: string = "http://localhost:8080/api/player"

@Injectable({
  providedIn: 'root'
})
export class PlayerService {


  constructor(private httpClient: HttpClient) { }


  changePlayerState(
    state: string, 
    roomId: string,
    contextUri?: string,
    offset?: number,
    positionMs?: number,
  ): Observable<any> {
    let userSessionJson = sessionStorage.getItem("USER_PROFILE");

    if(userSessionJson == null){
      throw "empty access token or session"
    }

    let userProfile: UserProfile = JSON.parse(userSessionJson)
    
    var params = `?state=${state}&roomId=${roomId}&tokenKey=${userProfile.id}`

    if(contextUri != null) {
      params = params + `&contextUri=${contextUri}`
    }

    if(offset != null) {
      params = params + `&offset=${offset}`
    }

    if(positionMs != null) {
      params = params + `&positionMs=${offset}`
    }
    
    return this.httpClient.get<any>(PLAYER_URL + "/playerState" + params);
  }

  public getCurrentlyPlayingTrack(tokenKey: string): Observable<GetCurrentlyPlayingTrackResponse> {
    
    let url = PLAYER_URL + "/currently-playing-track"

    let httpParams = new HttpParams().append('tokenKey', tokenKey)

    return this.httpClient.get<any>(url, {params: httpParams});
  }
}
