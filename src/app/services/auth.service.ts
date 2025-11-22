import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsuarioDTO {
  id: string;
  nombre: string;
  email: string;
  tipoCuenta: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl;
  private tokenKey = 'irentaspro_token';
  private meKey = 'irentaspro_user';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams().set('email', email).set('password', password);

    return this.http
      .post(`${this.base}/api/auth/login`, body.toString(), { headers, responseType: 'text' })
      .pipe(
        map(token => { this.setToken(token); return token; }),
        catchError(this.handleError)
      );
  }

  registrar(nombre: string, email: string, password: string): Observable<UsuarioDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams().set('nombre', nombre).set('email', email).set('password', password);

    return this.http
      .post<UsuarioDTO>(`${this.base}/api/auth/register`, body.toString(), { headers })
      .pipe(catchError(this.handleError));
  }

  me(): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.base}/api/auth/me`).pipe(
      map(u => { localStorage.setItem(this.meKey, JSON.stringify(u)); return u; }),
      catchError(this.handleError)
    );
  }

  // helpers
  setToken(token: string) { localStorage.setItem(this.tokenKey, token); }
  getToken() { return localStorage.getItem(this.tokenKey); }
  logout() { localStorage.removeItem(this.tokenKey); localStorage.removeItem(this.meKey); }
  isLoggedIn() { return !!this.getToken(); }
  getUsuarioActualCache(): UsuarioDTO | null {
    const raw = localStorage.getItem(this.meKey);
    return raw ? JSON.parse(raw) as UsuarioDTO : null;
  }

  private handleError(err: HttpErrorResponse) {
    let msg = 'Error de comunicación. Inténtalo de nuevo.';
    if (err.status === 0) msg = 'No se pudo conectar con el servidor.';
    else if (err.error?.message) msg = err.error.message;
    else if (typeof err.error === 'string') msg = err.error;
    return throwError(() => new Error(msg));
  }
}
