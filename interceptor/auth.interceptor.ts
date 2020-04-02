import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('authToken');

    if (!token) {
      const authReq = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json;',
        })
      });
      console.log('Intercepted HTTP call', authReq);
      return next.handle(authReq);
    }
    if (token) {
      const authReq = request.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json;',
        })
      });
      console.log('Intercepted HTTP call', authReq);
      return next.handle(authReq);
    }

  }
}