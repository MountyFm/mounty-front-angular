import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MyRoomsComonent } from './components/pages/my-rooms/my-rooms.component';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RoomComponent } from './components/pages/room/room.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExploreComponent,
    MyRoomsComonent,
    LoginComponent,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
