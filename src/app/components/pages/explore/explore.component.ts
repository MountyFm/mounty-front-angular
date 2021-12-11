import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/dtos/room';
import { RoomService } from 'src/app/room.service';
import { RoomsService } from 'src/app/rooms.service';
import { UserProfile } from 'src/app/dtos/userProfile';
import { RoomUserService } from 'src/app/room-user.service';

@Component({
  selector: 'explore',
  templateUrl: 'explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit{

  rooms: Room[] = [];
  userProfile!: UserProfile;

  constructor(private roomService: RoomService, private roomsService: RoomsService, private roomUserService: RoomUserService) {}


  ngOnInit(): void {
    this.roomsService.getRoomsForExplore()
    .subscribe(response => this.rooms = response.rooms)
    let userSessionJson = sessionStorage.getItem('USER_PROFILE');
    if(userSessionJson != null) {
      this.userProfile = JSON.parse(userSessionJson);
    }
    // const mockRooms = [
    //   {
    //     id: "1",
    //     title: "Bobby's room",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "2",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "1",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "1",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "1",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "1",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "1",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "1",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "1",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "1",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "1",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    //   {
    //     id: "1",
    //     title: "test",
    //     status: "active",
    //     isPrivate: false,
    //     imageUrl: "test",
    //     spotifyUri: "test",
    //     createdAt: new Date()
    //   },
    // ]

    // this.rooms = mockRooms
  }

  onSelect(room: Room) {
    this.roomService.initializeRoom(room)
  }

  buildArr(array: Room[]): Room[][]{
    var i,j, temporary, chunk = 4;
    var res: Room[][] = [];
    for (j = 0,i = array.length; j < i; j += chunk) {
      temporary = array.slice(j, j + chunk);
      res.push(temporary);
    }
    return res[0].map((col, i) => res.map(row => row[i]));
  }
}
