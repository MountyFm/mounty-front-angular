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
  tracks!: Track[]

  currentUserProfile!: UserProfile;
  currentRoomUser!: RoomUser;

  ownerProfile!: UserProfile;

  isPlay: boolean = true
  isOwner: boolean = false
  isTrackPlaying: boolean = false

  constructor(
    private roomService: RoomService,
    public chatService: ChatService,
    public playerService: PlayerService,
    public roomUserService: RoomUserService,
    public userProfileService: UserProfileService,
    ) { 
    this.room = this.roomService.returnRoom()

    let userSessionJson = sessionStorage.getItem('USER_PROFILE');
    if(userSessionJson != null) {
      this.currentUserProfile = JSON.parse(userSessionJson);
    }
    console.log(this.room)
  }

  ngOnInit(): void {
    this.getCurrentRoomUserAndInitializeOwner();
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
    console.log(this.currentUserProfile)
    var roomMessageDTO = new RoomMessageDTO(
      this.room.id, 
      this.currentUserProfile.id,
      this.currentUserProfile.name,
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

  getCurrentRoomUserAndInitializeOwner(){
    this.roomUserService.getOrAddCurrentRoomsUser(this.room.id, this.currentUserProfile.id).subscribe(r => {
      this.currentRoomUser = r.roomUser
      this.initializeOwner();
    });
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
    let trackPosition = this.tracks.indexOf(track);
    this.changePlayerState(
      "play",
      this.room.spotifyUri,
      trackPosition,
    )
  }

  initializeOwner() {
    if(this.currentRoomUser.type == "CREATOR") {
      this.isOwner = true;
      this.ownerProfile = this.currentUserProfile
    } else {
      this.roomUserService.getRoomUsers(this.room.id, "CREATOR").subscribe(response => this.getOwnerProfileById(response.roomUsers[0].profileId));
    }
  }

  getOwnerProfileById(id: string) {
    this.userProfileService.getUserProfileById(id).subscribe(response => this.ownerProfile = response.userProfile);
  }
}
