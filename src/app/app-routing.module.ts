import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersResolver } from './users/users.resolver';
import {StationComponent} from "./station/station.component";

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
    resolve: {
      users: UsersResolver,
    },
  },
  {
    path: "station",
    component: StationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

