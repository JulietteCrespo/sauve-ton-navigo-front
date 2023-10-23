import {Station} from "./station.model";

export interface Signalement {

  id?:bigint
  date: Date;
  heure: string;
  station: Station;
  nbr_controlleur: number;
  commentaire: string;
  humeur: string;
  position_controlleurs: string;
}
