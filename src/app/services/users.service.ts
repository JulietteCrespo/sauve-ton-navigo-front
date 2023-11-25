import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private usersUrl = 'http://localhost:8080/users';

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

  updateUser(user: Users, id: number) {
    return this.http.put<any>(`${this.usersUrl}/${id}`, user);
  }
}
