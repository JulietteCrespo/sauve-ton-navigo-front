import { Component } from '@angular/core';
import {Station} from "../models/station.model";
import {SignalementService} from "../services/signalement.service";
import {catchError, Observable, tap} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent {
  stationTouday$ : Observable<Station[]>;
  stationMonth$ : Observable<Station[]>;
  LigneMonth$ : Observable<number[]>
  msgStationDay: string ="";
  msgStationMonth: string ="";
  constructor(  private signalementService : SignalementService, private datePipe: DatePipe,) {
    const now = new Date();
    const currentDateFormatted = this.datePipe.transform(now, 'yyyy-MM-dd');
    const currentDate = currentDateFormatted || '';
    this.stationTouday$ = signalementService.findStatJour(currentDate);
    this.stationMonth$ = signalementService.findStatMonth(now.getMonth().valueOf()+1);
    this.LigneMonth$ = signalementService.findStatLigneMonth(now.getMonth().valueOf()+1);
    console.log(this.stationTouday$);
    this.stationTouday$.pipe(
      tap(stations => {
        const station = stations[0];
        if (station ==  undefined) {
          this.msgStationDay ="pas de signalements aujourd'hui";
          console.log(this.msgStationDay);
        }
      }))
      .subscribe();
    this.stationMonth$.pipe(
      tap(stations => {
        const station = stations[0];
        if (station ==  undefined) {
          this.msgStationMonth ="pas de signalements ce mois ci";
          console.log(this.msgStationMonth);
        }
      }))
      .subscribe();
  }
  changerPhoto(variable:number): string {
    const numeroMaxLignes = 14;
    const numeroLigne = Math.min(Math.max(variable, 1), numeroMaxLignes);
    const cheminImage = `../../assets/images/ligne${numeroLigne}.svg`;
    return cheminImage;
  }

}
