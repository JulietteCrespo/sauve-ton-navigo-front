import { Component } from '@angular/core';
import {first, Observable} from "rxjs";
import {Station} from "../models/station.model";
import {Signalement} from "../models/signalement.model";
import {SignalementService} from "../services/signalement.service";
import {StationService} from "../services/station.service";
import {DatePipe} from "@angular/common";
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  station$: Observable<Station[]>;
  signalement$: Observable<Signalement[]>;

  signalementService: SignalementService;

  currentDate: string;

  selectedStation: Station | undefined = undefined;

  selectedStationName: string ="Chatelet";

  id: number;

  constructor( private stationService: StationService, private signalementService1: SignalementService, private datePipe: DatePipe, private router: Router){
    this.signalementService = signalementService1;
    this.signalement$ = this.signalementService.findAllby5(0);
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
      this.signalement$ = this.signalementService.findAllby5(0);
    })
      .catch(error => {
        console.error('Erreur lors de la suppression', error);
      });
  }
  pageClick()  {
    // Changer de page en redirigeant vers page2.html
    window.location.href = "declarer";
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

  navigateToDetail(id: bigint | undefined): void {
    this.router.navigate(['/detail', id]);
  }
  onButtonEditClick(id: number) {
    this.router.navigate(['/editSignalement', id]);
  }

}
