import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Register } from '../models/register.model';
import { Login } from '../models/login.model';

@Injectable
({
  providedIn: 'root'
})
export class AuthService
{
  private apiUrl = 'http://localhost:8092/auth';

  constructor(private http: HttpClient) {}

  register(data: any, role: string): Observable<any>
  {
    const url = `${this.apiUrl}/sign-up/${role}`;
    return this.http.post(url, data, { responseType: 'text' });
  }
  

  login(data: any): Observable<any>
  {
    const url = `${this.apiUrl}/sign-in`;
    return this.http.post(url, data);
  }
}
