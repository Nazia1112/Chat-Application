
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor {
    getToken(){
    
            return localStorage.getItem('token');
          
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
       
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.getToken()}`
        }
        });



        if(request.method === 'POST'){
            request = request.clone({
            headers : request.headers.set('Content-Type', 'application/json')
            });
            }

        return next.handle(request);
    }
}