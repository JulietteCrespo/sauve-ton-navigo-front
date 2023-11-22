import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
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

  findById(id: number): Observable<Signalement> {
    return this.http.get<Signalement>(`${this.signalementUrl}/${id}`)
      .pipe(
        catchError((error: any, caught: Observable<Signalement>) => {
          console.error("error");
          return throwError(error);
        })
      );
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
  envoyerSignalement(signalementData : any) {
    return this.http.post(`http://localhost:8080/signalement`,signalementData);
  }

  updateSignalement(signalementData : any) {
    return this.http.post(`http://localhost:8080/signalement/update/${signalementData.id}`,signalementData);
  }
}
