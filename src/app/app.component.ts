import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "./services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  constructor(
      public authService: AuthService
  ) {}

  }
