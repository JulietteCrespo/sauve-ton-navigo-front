import { Component } from '@angular/core';
import {Station} from "../models/station.model";
import {SignalementService} from "../services/signalement.service";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent {
  stationTouday$ : Observable<Station[]>;
  stationMonth$ : Observable<Station[]>;
  constructor(  private signalementService : SignalementService, private datePipe: DatePipe,) {
    const now = new Date();
    const currentDateFormatted = this.datePipe.transform(now, 'yyyy-MM-dd');
    const currentDate = currentDateFormatted || '';
    this.stationTouday$ = signalementService.findStatJour(currentDate);
    console.log(now);
    this.stationMonth$ = signalementService.findStatMonth(now.getMonth().valueOf()+1);
    console.log(now.getMonth().valueOf());
  }
  changerPhoto(variable:number): string {
    const numeroMaxLignes = 14;
    const numeroLigne = Math.min(Math.max(variable, 1), numeroMaxLignes);
    const cheminImage = `../../assets/images/ligne${numeroLigne}.svg`;
    return cheminImage;
  }

}
