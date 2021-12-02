import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from './dtos/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private baseUrl: string = "http://localhost:8080/api/rooms"

  constructor(private httpClient: HttpClient) { }

  getRoomsForExplore(){
    var exploreRoute = this.baseUrl + "/explore&size=20"
    
    return this.httpClient.get<Room[]>(exploreRoute)
  }


}
