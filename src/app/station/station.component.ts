import { Component } from '@angular/core';
import {StationService} from "../services/station.service";
import {Observable} from "rxjs";

import {Station} from "../models/station.model";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent {
  station$: Observable<Station[]>;
  constructor( private stationService: StationService){
      this.station$ = this.stationService.findAll();
  }

}
