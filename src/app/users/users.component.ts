import { Component } from '@angular/core';
import { map, Observable } from "rxjs";
import {Users} from "../models/users.model"
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users$: Observable<Users[]> = this._route.data.pipe(map((data)=> data["users"]))

  constructor(private _route: ActivatedRoute, private usersService: UsersService, private router: Router){
    //this.users$ = usersService.findAll()
  }


}
