import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    deviceId?: string, 
    contextUri?: string,
    offset?: number
  ) {
    let userSessionJson = sessionStorage.getItem("USER_PROFILE");

    if(userSessionJson == null){
      throw "empty access token or session"
    }

    let userProfile: UserProfile = JSON.parse(userSessionJson)
      
    
    
    this.httpClient.get(PLAYER_URL, {params:{
      state: state,
      roomId: roomId,
      tokeyKey: userProfile.id,
      deviceId: deviceId!,
      contextUri: contextUri!,
      offset: offset!
    }}) 
  }
}
