import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PortfolioService } from '../services/portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'auth_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private portfolioService: PortfolioService) {
    this.isAuthenticatedSubject.next(this.hasToken());
  }

  login(username: string, password: string): Observable<boolean> {
    return this.portfolioService.login(username, password).pipe(
      tap(response => {
        this.setToken(response.access_token);
        this.isAuthenticatedSubject.next(true);
      }),
      map(() => true),
      catchError(error => {
        console.error('Login failed:', error);
        this.isAuthenticatedSubject.next(false);
        throw error;
      })
    );
  }

  logout(): void {
    this.clearToken();
    this.isAuthenticatedSubject.next(false);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated$;
  }
}
