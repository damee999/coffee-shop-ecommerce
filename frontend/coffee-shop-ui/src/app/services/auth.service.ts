import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUserSubject.next(JSON.parse(stored));
    }
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      email,
      password,
      firstName,
      lastName
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
