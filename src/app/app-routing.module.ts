import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { MyRoomsComonent } from './components/pages/my-rooms/my-rooms.component';

const routes: Routes = [
  { path: '', component: ExploreComponent},
  { path: 'explore', component: ExploreComponent},
  { path: 'my-rooms', component: MyRoomsComonent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
