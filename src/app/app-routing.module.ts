import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DeclarerComponent} from "./declarer/declarer.component";
import {RechercherComponent} from "./rechercher/rechercher.component";
import {UtilisateurComponent} from "./utilisateur/utilisateur.component";
import { UsersComponent } from './users/users.component';
import { UsersResolver } from './users/users.resolver';
import {StationComponent} from "./station/station.component";
import {DetailDeclarationComponent} from "./detail-declaration/detail-declaration.component";
  import {EditSignalementComponent} from "./edit-signalement/edit-signalement.component";

const routes: Routes = [{ path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "declarer", component: DeclarerComponent },
  { path: "rechercher", component: RechercherComponent },
  { path: "utilisateur", component: UtilisateurComponent },
  { path: 'editSignalement/:id', component: EditSignalementComponent },
  { path: 'detail/:id', component: DetailDeclarationComponent },
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

