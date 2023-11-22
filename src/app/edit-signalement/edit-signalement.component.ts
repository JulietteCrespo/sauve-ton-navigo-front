import {Component, OnInit} from '@angular/core';
import {first, Observable, of} from "rxjs";
import {Station} from "../models/station.model";
import {Signalement} from "../models/signalement.model";
import {StationService} from "../services/station.service";
import {DatePipe} from "@angular/common";
import {SignalementService} from "../services/signalement.service";
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-signalement',
  templateUrl: './edit-signalement.component.html',
  styleUrls: ['./edit-signalement.component.scss']
})

export class EditSignalementComponent {
  signalement$: Observable<Signalement> | undefined = undefined;
  station$: Observable<Station[]> ;
  selectedStation: Station | undefined = undefined;
  selectedNbrControlleur: number  = 1;
  selectedHumeur: string  = "Gentil";
  selectedPosition: string | undefined = undefined;
  selectedCom: string ="";
  selectedStationName: string ="Chatelet";
  currentDate: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '' ;
  currentTime: string = "00:00";
  nbrSortie: number =1;
  NumeroSortie: number =1;
  numbersArray: number[] = [];
  id: number = 1;

  idRecup: number = 1;
  constructor(private route: ActivatedRoute, private stationService: StationService,private popupService: PopupService, private datePipe: DatePipe, private dialogRef : MatDialog,  private signalementService: SignalementService){
    this.station$ = this.stationService.findAllByLigne(1);
    //const currentDateFormatted = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    //this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
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
          console.log("nbr sortie : "+ this.nbrSortie);
          this.selectedHumeur = signalement.humeur;
          this.selectedNbrControlleur= signalement.nbr_controlleurs;
          this.selectedCom = signalement.commentaire; 
          this.numbersArray = Array.from({ length: this.nbrSortie }, (_, i) => i + 1);
          if (this.selectedStation && this.selectedStation.id !== undefined) {
            this.id = this.selectedStation.id as unknown as number;
          }
          this.station$ = this.stationService.findAllByLigne(this.id);
          this.NumeroSortie = parseInt(signalement.position_controlleurs.charAt(signalement.position_controlleurs.length - 1), 10);
          this.currentDate = this.datePipe.transform(signalement.date, 'yyyy-MM-dd') || '' ;
          this.currentTime = signalement.heure as string;


        },
        (error) => {
          console.error(error);
        }
      );
  }

  showError(message: string): void {
    this.popupService.openErrorPopup(message);
  }
  onButtonFiendStationClick(id: number) {
    this.station$  = this.stationService.findAllByLigne(id);
    this.id = id;
    this.findNbrSortie();
  }
  findNbrSortie(){
    this.station$.pipe(first()).subscribe((stations: Station[]) => {
      if (stations.length > 0) {
        this.selectedStation = stations.find(station => station.nom === this.selectedStationName);
        this.nbrSortie=  this.selectedStation ? this.selectedStation.nbr_sortie : 0;
        this.numbersArray = Array.from({ length: this.nbrSortie }, (_, i) => i + 1);
      }
    });
  }

  dateNotInFutureValidator() {
    const dateLimite = new Date();
    const dateEntre= new Date(this.currentDate);
    return dateEntre <= dateLimite ? null : { futureDate: true };
  }

  envoyerSignalement() {
    if(this.dateNotInFutureValidator()){
      this.showError('Erreur : date incorecte');
    }else if (this.selectedNbrControlleur === undefined) {
      this.showError('Erreur : nombre de contrôleurs est indéfini');
    }else if (this.selectedHumeur === undefined) {
      this.showError('Erreur : humeur est indéfinie');
    }else {
      this.selectedPosition = "SORTIE" + this.NumeroSortie;
      const signalementData = {
        date: this.currentDate,
        heure: this.currentTime,
        station: this.selectedStation ? this.selectedStation : 1,
        nbr_controlleurs: this.selectedNbrControlleur,
        commentaire: this.selectedCom || 'Aucun commentaire',
        humeur: this.selectedHumeur,
        position_controlleurs: this.selectedPosition,
      };
      this.signalementService.envoyerSignalement(signalementData)
        .subscribe(response => {
          console.log('Réponse du serveur :', response);
          this.popupService.openSuccessPopup("Signalement ajouté");
        }, error => {
          console.error('Erreur lors de la requête :', error);
        });
    }
  }


}

