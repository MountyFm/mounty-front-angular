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

  currentRoomUser!: RoomUser;
  isPlay: boolean = true
  isOwner: boolean = false
  tracks!: Track[]
  isTrackPlaying: boolean = false
  roomUsers!: RoomUser[];
  roomOwner!: RoomUser;

  constructor(
    private roomService: RoomService,
    public chatService: ChatService,
    public playerService: PlayerService,
    public roomUserService: RoomUserService
    ) { 
    this.room = this.roomService.returnRoom()
    this.currentRoomUser = this.roomUserService.returnRoomUser()
    console.log(this.currentRoomUser)
    if(this.currentRoomUser.type == "CREATOR") {
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
    this.currentRoomUser = this.roomUserService.returnRoomUser();
    console.log(this.room)
    this.getRoomUsers();
    this.getRoomTracks();
    this.chatService.openWebSocket(this.room.id);
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.chatService.closeWebSocket();
    this.roomUserService.updateRoomUserStatus(this.currentRoomUser.id, false)
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

  getRoomUsers() {
    this.roomUserService.getRoomUsersByRoomId(this.room.id).subscribe(response => {
      this.roomUsers = response.roomUsers
      this.findAndInitializeCreator(response.roomUsers);
    })
  }

  findAndInitializeCreator(roomUsers: RoomUser[]) {
    let searchResult =  roomUsers.find(user => user.type == "CREATOR");
    if(searchResult != null){
      this.roomOwner = searchResult;
      if(this.roomOwner.id == this.currentRoomUser.id){
        this.isOwner = true;
      }
    }
    else
      throw "owner not found!"
  }
}
