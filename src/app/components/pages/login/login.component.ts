import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  public authUrl!: string

  ngOnInit(): void {
    this.authorize();
  }

  authorize(): void {
    this.authService.getAuthUrl().subscribe(response => this.authUrl = response.url);
  }
}