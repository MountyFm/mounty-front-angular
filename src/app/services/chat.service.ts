import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { RoomMessage } from '../dtos/roomMessage';
import { RoomMessageDTO } from '../dtos/roomMessageDTO';

const BASE_URL: string= "http://127.0.0.1:8082/messages"
const WS_URL: string= "ws://127.0.0.1:8082/chat?roomId="

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  roomMessages: RoomMessage[] = []
  webSocket!: WebSocket

  constructor(
    private httpClient: HttpClient
  ) { }

  public openWebSocket(roomId: string) {
    this.webSocket = new WebSocket(WS_URL+roomId)
    this.webSocket.onopen = (event) => {
      console.log("Open: ", event)
    }

    this.getMessages(roomId).subscribe
    (response => this.roomMessages = response.reverse())

    this.webSocket.onmessage = (event) => {
      const roomMessage = JSON.parse(event.data)
      this.roomMessages.push(roomMessage)
    }

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event)
    }
  }

  public sendMessage(roomMessageDTO: RoomMessageDTO) {
    this.webSocket.send(JSON.stringify(roomMessageDTO))
  }

  public closeWebSocket() {
    this.webSocket.close();
  }

  public getMessages(roomId: string){
    return this.httpClient.get<RoomMessage[]>(BASE_URL, {
      params: {
        roomId: roomId,
        numberOfMessages: 20
      }
    })
  }
}
