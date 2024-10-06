import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locality } from '../models/locality.model';

@Injectable({
  providedIn: 'root'
})
export class LocalityService {
  private apiUrl = 'http://localhost:8092/locality';

  constructor(private http: HttpClient) {}

  getLocalities(): Observable<{ localities: Locality[] }> {
    let url = `${this.apiUrl}/read`;
    return this.http.get<{ localities: Locality[] }>(url);
  }
  
}
