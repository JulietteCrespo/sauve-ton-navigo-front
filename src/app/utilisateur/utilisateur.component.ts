import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Users } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { PopupService } from '../popup/popup.service';

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
    mdp: '',
  };
  admin: String = 'utilisateur';

  users$: Observable<Users[]> = this._route.data.pipe(
    map((data) => data['users'])
  );

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private popupService: PopupService
  ) {
    this.usersService = usersService;
    this.users$ = this.usersService.findAll();
  }

  showError(message: string): void {
    this.popupService.openErrorPopup(message);
  }

  emailIsValid(): boolean {
    const emailPattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';
    const regex = new RegExp(emailPattern);
    return regex.test(this.newUser.email);
  }

  onAddUser() {
    if (
      !this.newUser.firstName ||
      !this.newUser.lastName ||
      !this.newUser.email ||
      !this.newUser.mdp
    ) {
      this.showError('Veuillez compléter tous les champs.');
    } else if (!this.emailIsValid()) {
      this.showError('Email invalide.');
    } else {
      if (this.admin === 'utilisateur') {
        this.newUser.admin = false;
        this.usersService.addUser(this.newUser).subscribe(() => {
          this.loadUsers();
          this.newUser = {
            firstName: '',
            lastName: '',
            email: '',
            admin: false,
            mdp: '',
          };
          this.newUser.admin = false;
        });
      } else {
        this.newUser.admin = true;
        this.usersService.addUser(this.newUser).subscribe(() => {
          this.loadUsers();
          this.newUser = {
            firstName: '',
            lastName: '',
            email: '',
            admin: false,
            mdp: '',
          };
          this.admin = '';
        });
      }
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
