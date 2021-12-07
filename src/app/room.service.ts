import { Injectable } from '@angular/core';
import { Room } from './dtos/room';
import { HttpClient } from '@angular/common/http';
import { RoomAndTracksResponse } from './dtos/roomAndTracks';
import { RoomsResponse } from './dtos/room';
import { Observable } from 'rxjs';
import { AccessToken } from './dtos/auth';
import { StorageService } from './storage.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl: string = "http://localhost:8080/api/rooms"

  room!: Room;

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }


  public initializeRoom(room: Room) {
    this.room = room
  }

  public returnRoom() {
    return this.room
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
}
