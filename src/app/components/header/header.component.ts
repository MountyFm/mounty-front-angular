import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/dtos/userProfile';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isAuthorized: boolean = false;
  userProfile!: UserProfile;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    let userProfile = this.storageService.returnUserProfile();
    if(userProfile != null) {
      this.userProfile = userProfile;
      this.isAuthorized = true;
    }
  }
}