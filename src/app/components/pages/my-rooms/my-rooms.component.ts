import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/dtos/room';
import { UserProfile } from 'src/app/dtos/userProfile';
import { RoomUserService } from 'src/app/room-user.service';
import { RoomService } from 'src/app/room.service';
import { RoomsService } from 'src/app/rooms.service';

@Component({
  selector: 'my-rooms',
  templateUrl: 'my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComonent implements OnInit {
  rooms: Room[] = [];
  userProfile!: UserProfile;
  inviteCode: string = '';

  constructor(private roomService: RoomService,
     private roomsService: RoomsService,
     private router: Router,
     private roomUserService: RoomUserService) {
      let userSessionJson = sessionStorage.getItem('USER_PROFILE');
      if(userSessionJson != null) {
        this.userProfile = JSON.parse(userSessionJson);
      }
     }


  ngOnInit(): void {
    this.roomsService.getCurrentUserRooms()
    .subscribe(response => {
      console.log(response.rooms.length)
      this.rooms = response.rooms
    })
  }

  onSelect(room: Room) {
    this.roomService.initializeRoom(room)
  }

  joinPrivateRoom(inviteCode: string) {
    let code = inviteCode.trim()
    this.roomService.getPrivateRooom(inviteCode).subscribe(response => {
      if(response.room) {
      this.roomService.initializeRoom(response.room)
      this.roomUserService.getOrAddCurrentRoomsUser(response.room.id, this.userProfile.id)
      this.router.navigate([`privateRoom/${response.room.id}`])
      } else {
        alert("Room not found")
      }
    },
    error => alert("Room not found")
    )
  }
}
