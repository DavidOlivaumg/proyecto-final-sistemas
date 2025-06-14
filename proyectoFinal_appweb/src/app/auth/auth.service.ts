import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://34.28.223.29:8080/api';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  registerPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patients`, patientData);
  }

 registerDoctor(doctorData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/doctors`, doctorData);
}

login(username: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/auth/login`, { username, password }).pipe(
    tap((response: any) => {
      console.log('🔑 Login response:', response);
      localStorage.setItem('currentUser', JSON.stringify({
        username: response.username,
        role: response.role?.toLowerCase() // Asegurar minúsculas
      }));
    })
  );
}

getUserRole(): string {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  console.log('👤 Current user from storage:', user);
  return user?.role?.toLowerCase() || '';
}

isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return !!user?.username;
}

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

   getCurrentUser(): any {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user;
  }

  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    return user?.userId || null;
  }


  
}