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

}
