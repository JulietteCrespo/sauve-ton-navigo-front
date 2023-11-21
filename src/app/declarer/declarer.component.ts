import { Component } from '@angular/core';
import {first, Observable} from "rxjs";
import {Station} from "../models/station.model";
import {Signalement} from "../models/signalement.model";
import {StationService} from "../services/station.service";
import {DatePipe} from "@angular/common";
import {SignalementService} from "../services/signalement.service";
//import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-declarer',
  templateUrl: './declarer.component.html',
  styleUrls: ['./declarer.component.scss']

})
export class DeclarerComponent {
  station$: Observable<Station[]>;
  selectedStation: Station | undefined = undefined;
  selectedNbrControlleur: number | undefined = undefined;
  selectedHumeur: string | undefined = undefined;
  selectedPosition: string | undefined = undefined;
  selectedCom: string | undefined = undefined;
  selectedStationName: string ="Chatelet";

  currentDate: string;
  currentTime: string;
  nbrSortie: number;
  NumeroSortie: number;
  numbersArray: number[] = [];
  id: number;
  constructor( private stationService: StationService,private popupService: PopupService, private datePipe: DatePipe, private dialogRef : MatDialog,  private signalementService: SignalementService){
    this.station$ = this.stationService.findAllByLigne(1);
    this.id =1;
    this.NumeroSortie =1;
    this.nbrSortie = 5;
    this.station$.pipe(first()).subscribe((stations: Station[]) => {
      this.selectedStation = stations[0];
      this.selectedStationName = stations[0].nom;
      this.nbrSortie = stations[0].nbr_sortie;
      this.numbersArray = Array.from({ length: this.nbrSortie }, (_, i) => i + 1);
    });
    const currentDateFormatted = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.currentDate = currentDateFormatted || '';
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }

  showError(message: string): void {
    //this.toastrService.error(message, 'Erreur', { closeButton: true });
    this.popupService.openErrorPopup(message);
/*      this.dialogRef.open(PopUpComponent,{
        data : {
          message : message,
          type: 'error'
        }
      });*/
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

