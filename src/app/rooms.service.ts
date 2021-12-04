import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExploreRoomsResponse } from './dtos/room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private baseUrl: string = "http://localhost:8080/api/rooms"

  constructor(private httpClient: HttpClient) { }

  getRoomsForExplore(): Observable<ExploreRoomsResponse>{
    var exploreRoute = this.baseUrl + "/explore?size=20"
    
    return this.httpClient.get<ExploreRoomsResponse>(exploreRoute)
  }


}
