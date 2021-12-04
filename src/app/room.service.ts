import { Injectable } from '@angular/core';
import { Room } from './dtos/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  room!: Room;

  constructor() { }


  public initializeRoom(room: Room) {
    this.room = room
  }

  public returnRoom() {
    return this.room
  }
}
