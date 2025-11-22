import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('irentaspro_token');

  const isAuthCall =
    req.url.includes('/api/auth/login') || req.url.includes('/api/auth/register');

  if (!token || isAuthCall) return next(req);

  const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  return next(authReq);
};
