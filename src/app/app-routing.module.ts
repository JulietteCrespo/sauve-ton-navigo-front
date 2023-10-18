import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DeclarerComponent} from "./declarer/declarer.component";
import {RechercherComponent} from "./rechercher/rechercher.component";
import {UtilisateurComponent} from "./utilisateur/utilisateur.component";


const routes: Routes = [{ path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "declarer", component: DeclarerComponent },
  { path: "rechercher", component: RechercherComponent },
  { path: "utilisateur", component: UtilisateurComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
