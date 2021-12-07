import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GetAccessTokenRequest } from 'src/app/dtos/auth'
import { UserProfileService } from 'src/app/user-profile.service';
import { UserProfile } from 'src/app/dtos/userProfile';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, 
    private userProfileService: UserProfileService, 
    private route: ActivatedRoute,
    private storageService: StorageService) {
    console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
        this.code = params['code'];
    });
  }

  public authUrl!: string

  public isAuthorized: boolean = false 

  public code!: string

  public userProfile!: UserProfile

  ngOnInit(): void {
    if(this.code != null)
      this.getAccessToken(this.code);
    else
      this.authorize();
  }

  authorize(): void {
    this.authService.getAuthUrl().subscribe(response => this.authUrl = response.url);
  }

  getAccessToken(code: string): void {
    let requestBody = new GetAccessTokenRequest(code, this.authService.REDIRECT_URL);
    this.authService.getAccessToken(requestBody).subscribe(response => {
      this.storageService.saveAccessToken(response);
      this.getUserProile(response.tokenKey);
    }
    )
  }

  getUserProile(tokenKey: string) {
    this.userProfileService.getUserProfile(tokenKey).subscribe(response => 
      {
        this.storageService.saveUserProfile(response.userProfile);
        window.location.href = '/explore'
      }
    )
  }
}