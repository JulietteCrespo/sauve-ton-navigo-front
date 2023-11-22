import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first, Observable, of} from "rxjs";
import {Signalement} from "../models/signalement.model";
import {Station} from "../models/station.model";
import {StationService} from "../services/station.service";
import {PopupService} from "../popup/popup.service";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SignalementService} from "../services/signalement.service";


@Component({
  selector: 'app-detail-declaration',
  templateUrl: './detail-declaration.component.html',
  styleUrls: ['./detail-declaration.component.scss']
})
export class DetailDeclarationComponent {
  signalement$: Observable<Signalement> | undefined = undefined;
  station$: Observable<Station[]>;
  selectedStation: Station | undefined = undefined;
  selectedNbrControlleur: number = 1;
  selectedHumeur: string = "Gentil";
  selectedPosition: string | undefined = undefined;
  selectedLigne: number = 1;
  selectedCom: string = "";
  selectedStationName: string = "erreur";
  currentDate: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
  currentTime: string = "00:00";
  nbrSortie: number = 1;
  NumeroSortie: number = 1;
  numbersArray: number[] = [];
  id: number = 1;

  idRecup: number = 1;

  constructor(private route: ActivatedRoute, private router: Router, private stationService: StationService, private popupService: PopupService, private datePipe: DatePipe, private dialogRef: MatDialog, private signalementService: SignalementService) {
    this.station$ = this.stationService.findAllByLigne(1);
    this.route.paramMap.subscribe(params => {
      this.idRecup = Number(params.get('id'));
    });
    this.signalementService.findById(this.idRecup)
      .subscribe(
        (signalement: Signalement) => {
          this.signalement$ = of(signalement);
          console.log(signalement);
          this.selectedStation = signalement.station;
          this.selectedStationName = this.selectedStation.nom;
          this.nbrSortie = this.selectedStation.nbr_sortie;
          this.selectedHumeur = signalement.humeur;
          this.selectedNbrControlleur = signalement.nbr_controlleurs;
          this.selectedCom = signalement.commentaire;
          this.numbersArray = Array.from({length: this.nbrSortie}, (_, i) => i + 1);
          this.selectedLigne = signalement.station.numero_ligne as unknown as number;
          this.station$ = this.stationService.findAllByLigne(this.selectedLigne);
          this.NumeroSortie = parseInt(signalement.position_controlleurs.charAt(signalement.position_controlleurs.length - 1), 10);
          this.currentDate = this.datePipe.transform(signalement.date, 'yyyy-MM-dd') || '';
          this.currentTime = signalement.heure as string;
        },
        (error) => {
          console.error(error);
        }
      );
  }
  onButtonFiendStationClick(id: number) {
    this.station$ = this.stationService.findAllByLigne(id);
    this.id = id;
    this.findNbrSortie();
  }

  findNbrSortie() {
    this.station$.pipe(first()).subscribe((stations: Station[]) => {
      if (stations.length > 0) {
        this.selectedStation = stations.find(station => station.nom === this.selectedStationName);
        this.nbrSortie = this.selectedStation ? this.selectedStation.nbr_sortie : 0;
        this.numbersArray = Array.from({length: this.nbrSortie}, (_, i) => i + 1);
      }
    });
  }
  changerPhoto(variable:number): string {
    const numeroMaxLignes = 14;
    const numeroLigne = Math.min(Math.max(variable, 1), numeroMaxLignes);
    const cheminImage = `../../assets/images/ligne${numeroLigne}.svg`;
    return cheminImage;
  }

}


