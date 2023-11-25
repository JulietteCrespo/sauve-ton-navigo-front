import { Component } from '@angular/core';
import {UsersService} from "../services/users.service";
import {Users} from "../models/users.model";
import {catchError, first, map, Observable, of, tap} from "rxjs";
import {Station} from "../models/station.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    emailLogin: string = '';
    mdp: string = '';

    users$: Observable<Users[]> = this._route.data.pipe(
        map((data) => data['users'])
    );

    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    admin: boolean | undefined ;


    constructor(
        private _route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService,
        private authService: AuthService
    ) {
        this.usersService = usersService;
        //this.users$ = this.usersService.findByEmail(this.emailLogin);
    }

    onSubmit(): void {
        this.usersService.connexion(this.emailLogin, this.mdp)
            .pipe(
                tap(users => {
                    //console.log('Users received:', users);
                    const user = users;
                    if (user.email!= null) {

                        this.firstName = user.firstName;
                        this.lastName = user.lastName;
                        this.admin = user.admin;
                        this.email = user.email;
                        this.usersService.setCurrentUser(user);
                        this.authService.login();
                        console.log(this.usersService.getCurrentUser());

                    } else {
                        console.log("L'utilisateur n'existe pas" );
                    }
                }),
                catchError(error => {
                    console.error('Error fetching users:', error);
                    throw error;
                })
            )
            .subscribe();
    }

}

