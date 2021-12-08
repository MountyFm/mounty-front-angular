import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { UserProfile } from './dtos/userProfile';

const PLAYER_URL: string = "http://localhost:8080/api/player/playerState"

@Injectable({
  providedIn: 'root'
})
export class PlayerService {


  constructor(private httpClient: HttpClient) { }


  changePlayerState(
    state: string, 
    roomId: string,
    contextUri?: string,
    offset?: number
  ) {
    let userSessionJson = sessionStorage.getItem("USER_PROFILE");

    if(userSessionJson == null){
      throw "empty access token or session"
    }

    let userProfile: UserProfile = JSON.parse(userSessionJson)
    
    var params = `?state=${state}&roomId=${roomId}&tokenKey=${userProfile.id}`

    if(contextUri != null) {
      params = params + `&contextUri=${contextUri}`
    }    
    
    this.httpClient.get<any>(PLAYER_URL+params).subscribe(response => {
      console.log(response)
    })
  }
}
