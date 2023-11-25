// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor() {
        // Charge l'état d'authentification depuis le stockage local lors de l'initialisation du service
        this.loadAuthState();
    }

    login(): void {
        // Logique de connexion réussie
        this.isAuthenticatedSubject.next(true);
        // Enregistre l'état d'authentification dans le stockage local
        this.saveAuthState();
    }

    logout(): void {
        // Logique de déconnexion réussie
        this.isAuthenticatedSubject.next(false);
        // Supprime l'état d'authentification du stockage local
        localStorage.removeItem('isAuthenticated');
    }

    get isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    private saveAuthState(): void {
        localStorage.setItem('isAuthenticated', 'true');
    }

    private loadAuthState(): void {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        this.isAuthenticatedSubject.next(isAuthenticated);
    }
}
