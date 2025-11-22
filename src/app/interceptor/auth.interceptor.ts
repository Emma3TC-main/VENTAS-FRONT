// src/app/interceptor/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('irentaspro_token');

  const isAuthCall =
    req.url.includes('/auth/login') || req.url.includes('/auth/register');

  // Añadir Authorization automáticamente si no es login/register
  const authReq = (!isAuthCall && token)
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      console.warn('HTTP ERROR:', err.status, err.error);

      if (err.status === 401 && !isAuthCall) {
        // Solo redirige a login (NO a inicio)
        router.navigate(['/login']);
      }

      // No manipula 403 – evita que te saque de la pantalla
      return throwError(() => err);
    })
  );
};
