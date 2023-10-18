import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Station} from "../models/station.model";
//import {Signalement} from "../models/signalement.model";
import {StationService} from "../services/station.service";

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.component.html',
  styleUrls: ['./rechercher.component.scss']
})
export class RechercherComponent {
  //station$: Observable<Station[]>;
  //signalement$: Observable<Signalement[]>;
  //constructor( private stationService: StationService, private signalementService: SignalementService){
  //}

}
