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
  constructor(  private signalementService : SignalementService, private datePipe: DatePipe,) {
    const currentDateFormatted = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const currentDate = currentDateFormatted || '';
    this.stationTouday$ = signalementService.findStatJour(currentDate);
  }
  changerPhoto(variable:number): string {
    const numeroMaxLignes = 14;
    const numeroLigne = Math.min(Math.max(variable, 1), numeroMaxLignes);
    const cheminImage = `../../assets/images/ligne${numeroLigne}.svg`;
    return cheminImage;
  }

}
