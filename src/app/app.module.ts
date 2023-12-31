import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StationComponent } from './station/station.component';
import { HomeComponent } from './home/home.component';
import { DeclarerComponent } from './declarer/declarer.component';
import { RechercherComponent } from './rechercher/rechercher.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpInterceptor } from './config.service';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpComponent } from './popup/popup.component';
import { DetailDeclarationComponent } from './detail-declaration/detail-declaration.component';
import { EditSignalementComponent } from './edit-signalement/edit-signalement.component';
import { LoginComponent } from './login/login.component';
import { StatistiqueComponent } from './statistique/statistique.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    StationComponent,
    HomeComponent,
    DeclarerComponent,
    RechercherComponent,
    UtilisateurComponent,
    PopUpComponent,
    EditSignalementComponent,
    PopUpComponent,
    DetailDeclarationComponent,
    LoginComponent,
    EditSignalementComponent,
    StatistiqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatDialogModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
