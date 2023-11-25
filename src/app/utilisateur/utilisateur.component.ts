import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Users } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss'],
})
export class UtilisateurComponent {
  newUser: Users = {
    firstName: '',
    lastName: '',
    email: '',
    admin: false,
  };

  admin: String = 'utilisateur';

  isEditing = false;

  users$: Observable<Users[]> = this._route.data.pipe(
    map((data) => data['users'])
  );

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {
    this.usersService = usersService;
    this.users$ = this.usersService.findAll();
  }

  onAddUser() {
    if (this.admin === 'utilisateur') {
      this.newUser.admin = false;
      this.usersService.addUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.newUser = { firstName: '', lastName: '', email: '', admin: false };
        this.newUser.admin = false;
      });
    } else {
      this.newUser.admin = true;
      this.usersService.addUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.newUser = { firstName: '', lastName: '', email: '', admin: false };
        this.admin = '';
      });
    }
  }

  loadUsers() {
    this.users$ = this.usersService.findAll();
  }

  onButtonDeleteClick(id: number) {
    this.usersService
      .delete(id)
      .then(() => {
        this.loadUsers();
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression', error);
      });
  }
}
