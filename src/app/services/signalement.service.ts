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
  private signalementUrl = 'http://localhost:8080/signalement';

  findAll(): Observable<Signalement[]> {
    return this.http.get<Signalement[]>(`${this.signalementUrl}/getAll`);
  }

  getAllStationAndDay(id: number,jour: String ): Observable<Signalement[]> {
    console.log(`${this.signalementUrl}/getAllStationAndDay?id=${id}&jour=${jour}`);
    return this.http.get<Signalement[]>(`${this.signalementUrl}/getAllStationAndDay?id=${id}&jour=${jour}`);
  }

  async delete(id: number){
    try {
      await this.http.delete(`${this.signalementUrl}/${id}`).toPromise();
      console.log('Suppression réussie');
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
      throw error;
    }
  }
}
