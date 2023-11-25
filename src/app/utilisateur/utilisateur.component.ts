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

  updatedUser: Users = {
    firstName: '',
    lastName: '',
    email: '',
    admin: false,
  };

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
    this.usersService.addUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = { firstName: '', lastName: '', email: '', admin: false };
    });
  }

  onEditClick() {}

  onUpdateUser(id: number, user: Users) {
    console.log(user);
    console.log(id);
    //  this.usersService.updateUser(user, id);
  }

  loadUsers() {
    // methode pour charger les utilisateurs depuis le service
  }

  onButtonDeleteClick(id: number) {
    this.usersService
      .delete(id)
      .then(() => {
        this.users$ = this.usersService.findAll();
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression', error);
      });
  }
}
