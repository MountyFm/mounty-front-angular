import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { MyRoomsComonent } from './components/pages/my-rooms/my-rooms.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
  { path: '', component: ExploreComponent},
  { path: 'explore', component: ExploreComponent},
  { path: 'my-rooms', component: MyRoomsComonent},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
