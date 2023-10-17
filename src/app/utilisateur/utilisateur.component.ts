import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {
  constructor(private router: Router) { }
  onButtonClick() {
    this.router.navigate(['/home']); // Remplacez 'page' par le chemin de la page vers laquelle vous souhaitez naviguer.
  }
}

