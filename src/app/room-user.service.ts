import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomUser, RoomUserResponse } from './dtos/roomUser';
import { HttpParams } from '@angular/common/http';
import { GetRoomUsersResponse } from './dtos/roomUser';
import { Observable } from 'rxjs';

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

  getOrAddCurrentRoomsUser(roomId: string, profileId: string) {
    return this.httpClient.post<RoomUserResponse>(`${this.baseUrl}/new`, {
      roomId: roomId,
      profileId: profileId
    }).subscribe(response => 
      this.roomUser = response.roomUser)
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
