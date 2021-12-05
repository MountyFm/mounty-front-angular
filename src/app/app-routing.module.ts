import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { MyRoomsComonent } from './components/pages/my-rooms/my-rooms.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RoomComponent } from './components/pages/room/room.component';

const routes: Routes = [
  { path: '', component: ExploreComponent},
  { path: 'explore', component: ExploreComponent},
  { path: 'explore/room/:roomId', component: RoomComponent},
  { path: 'my-rooms', component: MyRoomsComonent},  
  { path: 'my-rooms/room/:roomId', component: RoomComponent},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
