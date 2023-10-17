import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersResolver } from './users/users.resolver';

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
    resolve: {
      users: UsersResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

