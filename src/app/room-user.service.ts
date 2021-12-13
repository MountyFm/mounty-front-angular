import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomUser, RoomUserResponse } from './dtos/roomUser';
import { HttpParams } from '@angular/common/http';
import { GetRoomUsersResponse } from './dtos/roomUser';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { UserProfile } from './dtos/userProfile';
import { Room } from './dtos/room';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class RoomUserService {
  private baseUrl: string = "http://localhost:8080/api/room-users"

  constructor(private httpClient: HttpClient,private userProfileService: UserProfileService) { }

  roomUser!: RoomUser
  ownerProfile!: UserProfile;
  currentUserProfile!: UserProfile;
  currentRoomUser!: RoomUser;
  isOwner: boolean = false


  public returnRoomUser(): RoomUser {
    return this.roomUser
  }

  public initializeRoomUser(roomUser: RoomUser) {
    this.roomUser = roomUser;
  }

  getCurrentRoomUserAndInitializeOwner(room: Room){
    this.getOrAddCurrentRoomsUser(room.id, this.currentUserProfile.id).subscribe(r => {
      this.currentRoomUser = r.roomUser
      this.initializeOwner(room);
    });
  }


  initializeOwner(room: Room) {
    if(this.currentRoomUser.type == "CREATOR") {
      this.isOwner = true;
      this.ownerProfile = this.currentUserProfile
    } else {
      this.getRoomUsers(room.id, "CREATOR").subscribe(response => this.getOwnerProfileById(response.roomUsers[0].profileId));
    }
  }


  getOwnerProfileById(id: string) {
    this.userProfileService.getUserProfileById(id).subscribe(response => this.ownerProfile = response.userProfile);
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

  getRoomUsers(roomId: string, type: string): Observable<GetRoomUsersResponse>  {
    let httpParams = new HttpParams().append('roomId', roomId)

    if(type != undefined) httpParams.append('type', type)

    return this.httpClient.get<GetRoomUsersResponse>(`${this.baseUrl}`, {params: httpParams})
  }
}
