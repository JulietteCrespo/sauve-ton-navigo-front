import { Component } from '@angular/core';
import {first, Observable} from "rxjs";
import {Station} from "../models/station.model";
import {Signalement} from "../models/signalement.model";
import {StationService} from "../services/station.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-declarer',
  templateUrl: './declarer.component.html',
  styleUrls: ['./declarer.component.scss']
})
export class DeclarerComponent {
  station$: Observable<Station[]>;
  selectedStation: Station | undefined = undefined;
  selectedStationName: string ="Chatelet";

  currentDate: string;
  currentTime: string;
  nbrSortie: number;
  NumeroSortie: number;
  numbersArray: number[] = [];
  id: number;
  constructor( private stationService: StationService, private datePipe: DatePipe){
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
    this.currentTime = `${hours}:${minutes}`
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


}

