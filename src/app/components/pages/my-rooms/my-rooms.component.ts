import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/dtos/room';
import { RoomService } from 'src/app/room.service';
import { RoomsService } from 'src/app/rooms.service';

@Component({
  selector: 'my-rooms',
  templateUrl: 'my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComonent implements OnInit {
  rooms: Room[] = [];

  constructor(private roomService: RoomService, private roomsService: RoomsService) {}
  

  ngOnInit(): void {
    // this.roomsService.getCurrentUserRooms()
    // .subscribe(response => this.rooms = response.rooms)
     const mockRooms = [
       {
         id: "1",
         title: "Bobby's room",
         status: "active",
         isPrivate: false,
         imageUrl: "test",
         spotifyUri: "test",
         createdAt: new Date()
       },
       {
         id: "1",
         title: "test",
         status: "active",
         isPrivate: false,
         imageUrl: "test",
         spotifyUri: "test",
         createdAt: new Date()
       },
       {
         id: "1",
         title: "test",
         status: "active",
         isPrivate: false,
         imageUrl: "test",
         spotifyUri: "test",
         createdAt: new Date()
       },
       {
         id: "1",
         title: "test",
         status: "active",
         isPrivate: false,
         imageUrl: "test",
         spotifyUri: "test",
         createdAt: new Date()
       },
       {
         id: "1",
         title: "test",
         status: "active",
         isPrivate: false,
         imageUrl: "test",
         spotifyUri: "test",
         createdAt: new Date()
       },
       {
         id: "1",
         title: "test",
         status: "active",
         isPrivate: false,
         imageUrl: "test",
         spotifyUri: "test",
         createdAt: new Date()
       },
       {
         id: "1",
         title: "test",
         status: "active",
         isPrivate: false,
         imageUrl: "test",
         spotifyUri: "test",
         createdAt: new Date()
       },
       {
         id: "1",
         title: "test",
         status: "active",
         isPrivate: false,
         imageUrl: "test",
         spotifyUri: "test",
         createdAt: new Date()
       },
       {
         id: "1",
         title: "test",
         status: "active",
         isPrivate: false,
         imageUrl: "test",
         spotifyUri: "test",
         createdAt: new Date()
       },
     {
       id: "1",
       title: "test",
       status: "active",
       isPrivate: false,
       imageUrl: "test",
       spotifyUri: "test",
       createdAt: new Date()
     },
     {
       id: "1",
       title: "test",
       status: "active",
       isPrivate: false,
       imageUrl: "test",
       spotifyUri: "test",
       createdAt: new Date()
     },
     {
       id: "1",
       title: "test",
       status: "active",
       isPrivate: false,
       imageUrl: "test",
       spotifyUri: "test",
       createdAt: new Date()
      },
     ]

     this.rooms = mockRooms
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