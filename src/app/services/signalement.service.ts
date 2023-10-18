import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';
import { Signalement } from '../models/signalement.model';

@Injectable({
  providedIn: 'root',
})
export class SignalementService {
  constructor(private http: HttpClient) {}
  private usersUrl = 'http://localhost:8080/users';

  findAll(): Observable<Signalement[]> {
    return this.http.get<Signalement[]>(`${this.usersUrl}/getAll`);
  }
}
