import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locality } from '../models/locality.model';
import { Weather } from '../models/weather.model';

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

  createLocality(locality: any): Observable<any> {
    let url = `${this.apiUrl}/create`;
    return this.http.post(url, locality, { responseType: 'text' });
  }
  
  deleteLocality(localityId: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${localityId}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  getWeather(Locality: Locality): Observable<Weather> {
    let url = `${this.apiUrl}/weather`;

    let params = [];
    
    if (Locality.latitude) {
        params.push(`latitude=${Locality.latitude}`);
    }
    if (Locality.longitude) {
        params.push(`longitude=${Locality.longitude}`);
    }

    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }

    return this.http.get<Weather>(url);
  } 
}
