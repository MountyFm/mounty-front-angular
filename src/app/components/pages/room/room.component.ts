import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/dtos/room';
import { RoomService } from 'src/app/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room: Room

  constructor(private roomService: RoomService) { 
    this.room = this.roomService.returnRoom()
    console.log(this.room)
  }

  ngOnInit(): void {
    this.room = this.roomService.returnRoom()
    console.log(this.room)
  }

}
