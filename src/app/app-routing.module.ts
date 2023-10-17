import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DeclarerComponent} from "./declarer/declarer.component";


const routes: Routes = [{ path: "", component: HomeComponent },
  { path: "declarer", component: DeclarerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
