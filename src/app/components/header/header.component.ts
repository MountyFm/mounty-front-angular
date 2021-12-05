import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/dtos/userProfile';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isAuthorized: boolean = false;
  userProfile!: UserProfile;

  ngOnInit(): void {
    let userSessionJson = sessionStorage.getItem('USER_PROFILE');
    if(userSessionJson != null) {
      this.userProfile = JSON.parse(userSessionJson);
      this.isAuthorized = true;
    }
  }
}