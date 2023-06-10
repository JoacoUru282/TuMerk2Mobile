import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../servicios/api/auth.service';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { from } from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(request, next));
  }

  async handle(request: HttpRequest<any>, next: HttpHandler) {
    const token = await this.auth.getToken()
    const newHeaders = new HttpHeaders({
      ...request.headers,
      'Authorization': `Bearer ${token}`,
    })
    console.log(request.headers);
    
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(request.headers);
    return await lastValueFrom(next.handle(authRequest));
  }

}