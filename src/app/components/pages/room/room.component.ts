import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from 'src/app/dtos/room';
import { RoomMessageDTO } from 'src/app/dtos/roomMessageDTO';
import { UserProfile } from 'src/app/dtos/userProfile';
import { RoomUser } from 'src/app/dtos/roomUser';
import { PlayerService } from 'src/app/player.service';
import { RoomService } from 'src/app/room.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserProfileService } from 'src/app/user-profile.service';
import { Track } from 'src/app/dtos/track';
import { RoomUserService } from 'src/app/room-user.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [ChatService]
})
export class RoomComponent implements OnInit,OnDestroy,AfterViewChecked {
  @ViewChild('scrollChat')
  private scrollContainer!: ElementRef;

  userProfile!: UserProfile;
  room: Room

  roomUser!: RoomUser;
  isPlay: boolean = true
  isOwner: boolean = true
  tracks!: Track[]
  isTrackPlaying: boolean = false

  constructor(
    private roomService: RoomService,
    public chatService: ChatService,
    public playerService: PlayerService,
    public roomUserService: RoomUserService
    ) { 
    this.room = this.roomService.returnRoom()
    this.roomUser = this.roomUserService.returnRoomUser()
    console.log(this.roomUser)
    if(this.roomUser.type == "CREATOR") {
      this.isOwner = true
    } else {
      this.isOwner = false
    }

    let userSessionJson = sessionStorage.getItem('USER_PROFILE');
    if(userSessionJson != null) {
      this.userProfile = JSON.parse(userSessionJson);
    }
    console.log(this.room)
  }

  ngOnInit(): void {
    this.room = this.roomService.returnRoom()
    console.log(this.room)
    this.getRoomTracks();
    this.chatService.openWebSocket(this.room.id);
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.chatService.closeWebSocket();
    this.roomUserService.updateRoomUserStatus(this.roomUser.id, false)
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(sendForm: NgForm) {
    console.log(this.userProfile)
    var roomMessageDTO = new RoomMessageDTO(
      this.room.id, 
      this.userProfile.id,
      this.userProfile.name,
      sendForm.value.message
    )
    this.chatService.sendMessage(roomMessageDTO)
    sendForm.controls['message'].reset()
  }

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight
    } catch(err) {}
  }

  getHoursAndMinutes(date: Date) {
    return (new Date(date)).getHours().toString() + ":" + ((new Date(date)).getMinutes()<10?'0':'') + (new Date(date)).getMinutes().toString();
  }

  changePlayerState(state: string, contextUri?: string, offset?: number) {
    console.log(state)
    if (state == "play") {
      this.isPlay = false
    } else if (state == "stop") {
      this.isPlay = true
    }

    this.playerService.changePlayerState(
      state = state,
      this.room.id,
      contextUri = contextUri,
      offset = offset
    )
  }

  getRoomTracks() {
    this.roomService.getRoomTracks(this.room.id).subscribe(response => 
      {
        this.room = response.room
        this.tracks = response.tracks
      }
    )
  }

  play(track: Track) {
    this.playerService.changePlayerState(
      "play",
      this.room.id,
      track.spotifyUri
    )
  }
}
