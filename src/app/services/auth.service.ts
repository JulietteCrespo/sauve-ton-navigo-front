import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    private isAdminSubject = new BehaviorSubject<boolean>(false);

    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    isAdmin$ = this.isAdminSubject.asObservable();

    constructor() {
        // Charge l'état d'authentification depuis le stockage local lors de l'initialisation du service
        this.loadAuthState();
    }

    login(isAdmin: boolean = false): void {
        // Logique de connexion réussie
        this.isAuthenticatedSubject.next(true);
        this.isAdminSubject.next(isAdmin);
        // Enregistre l'état d'authentification dans le stockage local
        this.saveAuthState();
    }

    logout(): void {
        // Logique de déconnexion réussie
        this.isAuthenticatedSubject.next(false);
        this.isAdminSubject.next(false);
        // Supprime l'état d'authentification du stockage local
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
    }

    get isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    get isAdmin(): boolean {
        return this.isAdminSubject.value;
    }

    private saveAuthState(): void {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', this.isAdminSubject.value.toString());
    }

    private loadAuthState(): void {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        this.isAuthenticatedSubject.next(isAuthenticated);

        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        this.isAdminSubject.next(isAdmin);
    }
}
