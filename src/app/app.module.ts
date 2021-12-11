import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MyRoomsComonent } from './components/pages/my-rooms/my-rooms.component';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoomComponent } from './components/pages/room/room.component';
import { ChatService } from './services/chat.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalHttpInterceptor } from 'src/http.interceptor';

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
    HttpClientModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    AuthService, 
    ChatService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
