import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Signalement } from '../models/signalement.model';
import { SignalementService } from '../services/signalement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signalement',
  templateUrl: './signalement.component.html',
  styleUrls: ['./signalement.component.scss'],
})
export class SignalementComponent {
  signalement$: Observable<Signalement[]>;

  constructor(
    private _route: ActivatedRoute,
    private signalementService: SignalementService,
    private router: Router
  ) {
    this.signalement$ = signalementService.findAll(0);
  }
}
