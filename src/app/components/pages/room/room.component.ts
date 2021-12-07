import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from 'src/app/dtos/room';
import { RoomMessageDTO } from 'src/app/dtos/roomMessageDTO';
import { UserProfile } from 'src/app/dtos/userProfile';
import { RoomService } from 'src/app/room.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserProfileService } from 'src/app/user-profile.service';
import { Track } from 'src/app/dtos/track';

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
  tracks!: Track[]
  isTrackPlaying: boolean = false

  constructor(
    private roomService: RoomService,
    public chatService: ChatService,
    ) { 
    this.room = this.roomService.returnRoom()
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
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(sendForm: NgForm) {
    console.log(this.userProfile)
    var roomMessageDTO = new RoomMessageDTO(
      this.room.id, 
      "test",
      // this.userProfile.id,
      // this.userProfile.name,
      "test",
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

  getRoomTracks() {
    this.roomService.getRoomTracks(this.room.id).subscribe(response => 
      {
        this.room = response.room
        this.tracks = response.tracks
      }
    )
  }

  play() {
    if(this.isTrackPlaying){
      this.isTrackPlaying = false
      alert("playing")
    }
    else{
      this.isTrackPlaying = true
      alert("paused")
    }
  }
}
