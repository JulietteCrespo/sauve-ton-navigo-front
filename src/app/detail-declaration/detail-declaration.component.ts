import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail-declaration',
  templateUrl: './detail-declaration.component.html',
  styleUrls: ['./detail-declaration.component.scss']
})
export class DetailDeclarationComponent {
  constructor(private route: ActivatedRoute) {}


  changerPhoto(variable:number): string {
    const numeroMaxLignes = 14;
    const numeroLigne = Math.min(Math.max(variable, 1), numeroMaxLignes);
    const cheminImage = `../../assets/images/ligne${numeroLigne}.svg`;
    return cheminImage;
  }
}
