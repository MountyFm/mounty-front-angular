import { Injectable } from '@angular/core';
import { MakeRoomPrivateResponse, Room, RoomResponse, UpdateRoomResponse } from './dtos/room';
import { HttpClient } from '@angular/common/http';
import { RoomAndTracksResponse } from './dtos/roomAndTracks';
import { RoomsResponse } from './dtos/room';
import { Observable } from 'rxjs';
import { AccessToken } from './dtos/auth';
import { StorageService } from './storage.service';
import { HttpParams } from '@angular/common/http';
import { Track } from './dtos/track';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl: string = "http://localhost:8080/api/rooms"

  room!: Room;
  tracks!: Track[]

  constructor(private httpClient: HttpClient,
     private storageService: StorageService) { }


  public initializeRoom(room: Room) {
    this.room = room
    this.getRoomTracksForRoom()
  }

  public returnRoom() {
    return this.room
  }

  private getRoomTracksForRoom() {
    this.getRoomTracks(this.room.id).subscribe(response => 
      {
        this.room = response.room
        this.tracks = response.tracks
      }
    )
  }

  public getRoomTracks(roomId: string, limit?: number, offset?: number): Observable<RoomAndTracksResponse> {
    let roomTracksUrl = this.baseUrl + "/room-and-track"
    let accessToken: AccessToken | null = this.storageService.returnAccessToken();

    if (accessToken == null) {
      throw "access token is missing";
    }

    let httpParams = new HttpParams().append('tokenKey', accessToken.tokenKey)
    .append('limit', (limit !=undefined) ? limit : 10)
    .append('offset', (offset !=undefined)? offset : 0)
    .append('roomId', roomId)


    return this.httpClient.get<RoomAndTracksResponse>(roomTracksUrl, { params: httpParams})
  }

  public getPrivateRooom(inviteCode: string) {
    return this.httpClient.get<RoomResponse>(this.baseUrl, {params: {inviteCode: inviteCode}})}
  
    
  public makeRoomPrivate(inviteCode: string) {
    return this.httpClient.put<MakeRoomPrivateResponse>(this.baseUrl+"/private",{
      roomId: this.room.id,
      inviteCode: inviteCode,
    })
  }  

  public makeRoomPublic() {
    return this.httpClient.put<UpdateRoomResponse>(this.baseUrl+"/update",{
      id: this.room.id,
      inviteCode: "",
      isPrivate: false
    })
  }  

  // public getCurrentlyPlayingTracj() {

  // }
  
}
