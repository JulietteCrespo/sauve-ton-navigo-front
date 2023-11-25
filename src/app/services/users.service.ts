import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError, tap} from 'rxjs';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private usersUrl = 'http://localhost:8080/users';

  private currentUser: Users | undefined;

  setCurrentUser(user: Users): void {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  findAll(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.usersUrl}/getAll`);
  }

  async delete(id: number) {
    try {
      await this.http.delete(`${this.usersUrl}/${id}`).toPromise();
      console.log('Suppression réussie');
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
      throw error;
    }
  }

  addUser(newUser: Users): Observable<any> {
    console.log(newUser);
    return this.http.post<any>(`${this.usersUrl}`, newUser);
  }

  findByEmail(email: string): Observable<Users> {
    return this.http.get<Users>(`${this.usersUrl}/email/${email}`);
  }

  connexion(email:string, mdp:string): Observable<Users> {

    return this.http.get<Users>(`${this.usersUrl}/connexion/${email}/${mdp}`);
  }

}
