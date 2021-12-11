import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomUser, RoomUserResponse } from './dtos/roomUser';
import { HttpParams } from '@angular/common/http';
import { GetRoomUsersResponse } from './dtos/roomUser';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RoomUserService {
  private baseUrl: string = "http://localhost:8080/api/room-users"

  constructor(private httpClient: HttpClient) { }

  roomUser!: RoomUser


  public returnRoomUser(): RoomUser {
    return this.roomUser
  }

  public initializeRoomUser(roomUser: RoomUser) {
    this.roomUser = roomUser;
  }

  getOrAddCurrentRoomsUser(roomId: string, profileId: string): Observable<RoomUserResponse> {
    return this.httpClient.post<RoomUserResponse>(`${this.baseUrl}/new`, {
      roomId: roomId,
      profileId: profileId
    })
  }

  updateRoomUserStatus(id: string, isActive: boolean) {
    this.httpClient.put<any>(`${this.baseUrl}/update`, {
      id: id,
      isActive: isActive
    }).subscribe(response => console.log(response))
  }

  getRoomUsersByRoomId(roomId: string): Observable<GetRoomUsersResponse>  {
    let httpParams = new HttpParams().append('roomId', roomId)

    return this.httpClient.get<GetRoomUsersResponse>(`${this.baseUrl}`, {params: httpParams})
  }
}
