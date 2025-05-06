import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = environment.backendURL;
  private authToken = localStorage.getItem('auth_token') || null
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authToken}`
  })

  constructor(private http: HttpClient) { }

  detail(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/account/detail`, { headers: new HttpHeaders(this.headers) })
  }

  update(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/account/update`, data, { headers: new HttpHeaders(this.headers) });
  }

  password(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/account/password`, data, { headers: new HttpHeaders(this.headers) });
  }

  upload(image: File): Observable<any> {
    const uploadHeader = new Headers({
      'Authorization': `Bearer ${this.authToken}`
    })
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post(`${this.baseUrl}/api/account/upload`, formData, { headers: new HttpHeaders(uploadHeader) });
  }

  activity(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/account/activity`, { headers: new HttpHeaders(this.headers) })
  }

  getImage(image: string) {
    return `${this.baseUrl}/Uploads/${image}`
  }
}
