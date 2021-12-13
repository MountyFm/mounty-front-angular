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

  room: Room;
  roomUsers!: RoomUser[];
  inviteCode: string = "";

  isPlay: boolean = true
  isTrackPlaying: boolean = false
  isPrivate: boolean = false
  isChecked: boolean = false

  constructor(
    public roomService: RoomService,
    public chatService: ChatService,
    public playerService: PlayerService,
    public roomUserService: RoomUserService,
    public userProfileService: UserProfileService,
    ) { 
    this.room = this.roomService.returnRoom()
    this.isPrivate = this.room.isPrivate
    this.isChecked = this.room.isPrivate

    if(this.room.inviteCode != null) {
      this.inviteCode = this.room.inviteCode
    } else {
      this.inviteCode = ""
    }
    let userSessionJson = sessionStorage.getItem('USER_PROFILE');
    if(userSessionJson != null) {
      this.roomUserService.currentUserProfile = JSON.parse(userSessionJson);
    }
    console.log(this.room)
  }

  ngOnInit(): void {
    this.chatService.openWebSocket(this.room.id);
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.chatService.closeWebSocket();
    this.roomUserService.updateRoomUserStatus(this.roomUserService.currentRoomUser.id, false)
    this.roomService.tracks = []
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(sendForm: NgForm) {
    console.log(this.roomUserService.currentUserProfile)
    var roomMessageDTO = new RoomMessageDTO(
      this.room.id, 
      this.roomUserService.currentUserProfile.id,
      this.roomUserService.currentUserProfile.name,
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

    this.playerService.changePlayerState(
      state = state,
      this.room.id,
      contextUri = contextUri,
      offset = offset
    ).subscribe(response => {
      if (state == "play") {
        this.isPlay = false
      } else if (state == "stop") {
        this.isPlay = true
      }
      console.log(response);
    })
  }


  play(track: Track) {
    let trackPosition = this.roomService.tracks.indexOf(track);
    this.changePlayerState(
      "play",
      this.room.spotifyUri,
      trackPosition,
    )
  }

  makeRoomPrivate(inviteCode: string) {
    console.log(this.isChecked)
    if(this.isChecked == true) {
      console.log("here")
      this.roomService.makeRoomPrivate(inviteCode).subscribe(response => {
        this.inviteCode = response.inviteCode
        this.isPrivate = true
        this.isChecked = true
      },
      error => alert(error)
      )
    } else {
      this.roomService.makeRoomPublic().subscribe(response => {
        if(response.updated == true) {
          console.log(response)
          this.isPrivate = false
          this.isChecked = false
          this.inviteCode = ""
        }
      },
      error => alert(error)
      )
    }
    
  }
}
