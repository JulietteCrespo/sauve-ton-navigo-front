import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {Station} from "../models/station.model"

@Injectable({
  providedIn: "root",
})

export class StationService{
  constructor(private http: HttpClient){
  }
  private stationUrl = "http://localhost:8080/station"

  findAll(): Observable<Station[]>{
    return this.http.get<Station[]>(`${this.stationUrl}/getAll`)
  }



  findAllByLigne(id: number):  Observable<Station[]>{
    return this.http.get<Station[]>(`${this.stationUrl}/getAllLigne/${id}`)
  }

  getNbrSortie(id: number): Observable<number>{
    return this.http.get<number>(`${this.stationUrl}/getNbrSortie/${id}`)
  }

}
