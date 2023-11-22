import { Component } from '@angular/core';
import {first, Observable} from "rxjs";
import {Station} from "../models/station.model";
//import {Signalement} from "../models/signalement.model";
import {StationService} from "../services/station.service";
import {Signalement} from "../models/signalement.model";
import {SignalementService} from "../services/signalement.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.component.html',
  styleUrls: ['./rechercher.component.scss']
})
export class RechercherComponent {
  lignesArray: number[] = Array.from({ length: 14 }, (_, index) => index + 1);
  station$: Observable<Station[]>;
  signalement$: Observable<Signalement[]>;

  signalementService: SignalementService;

  currentDate: string;

  selectedStation: Station | undefined = undefined;

  selectedStationName: string ="Chatelet";

  id: number;

  constructor(private router: Router, private stationService: StationService, private signalementService1: SignalementService, private datePipe: DatePipe){
    this.signalementService = signalementService1;
    this.signalement$ = this.signalementService.findAll(0);
    this.id =1;
    this.station$ = this.stationService.findAllByLigne(1);
    this.station$.pipe(first()).subscribe((stations: Station[]) => {
        this.selectedStation = stations[0];
        this.selectedStationName = stations[0].nom;
    });
    const currentDateFormatted = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.currentDate = currentDateFormatted || '';
  }

  onButtonDeleteClick(id: number) {
    this.signalementService.delete(id).then(() => {
      this.signalement$ = this.signalementService.findAll(0);
    })
      .catch(error => {
        console.error('Erreur lors de la suppression', error);
      });
  }

  onButtonEditClick(id: number) {
    this.router.navigate(['/editSignalement', id]);
  }


  onButtonFiendStationClick(id: number) {
    this.station$  = this.stationService.findAllByLigne(id);
    this.id = id;
  }

  onButtonFiendAllStationAndDay() {
    this.station$.pipe(first()).subscribe((stations: Station[]) => {
      if (stations.length > 0) {
        this.selectedStation = stations.find(station => station.nom === this.selectedStationName);
      }
    });
    if (this.selectedStation) {
      console.log(Number(this.selectedStation.id));
      console.log(this.currentDate);
      this.signalement$ = this.signalementService.getAllStationAndDay(Number(this.selectedStation.id), this.currentDate);

    }
  }

  toNumber(bigIntValue: bigint | undefined): number {
    if (bigIntValue) {
      return Number(bigIntValue);
    }
    return 0;
  }
  changerPhoto(variable:number): string {
    const numeroMaxLignes = 14;
    const numeroLigne = Math.min(Math.max(variable, 1), numeroMaxLignes);
    const cheminImage = `../../assets/images/ligne${numeroLigne}.svg`;
    return cheminImage;
  }






}
