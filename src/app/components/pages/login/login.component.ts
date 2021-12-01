import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authorize();
  }

  authorize(): void {
    this.authService.getAuthUrl().subscribe(response => window.location.href = response.url);
  }
}