import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.backendURL;

  constructor(private http: HttpClient) { }

  ping(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/auth/ping`)
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/register`, data);
  }

  confirm(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/auth/confirm/${token}`);
  }

  forgot(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/email/forgot`, data);
  }

  reset(token: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/email/reset/${token}`, data);
  }

}
