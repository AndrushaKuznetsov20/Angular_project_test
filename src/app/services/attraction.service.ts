import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attraction } from '../models/attraction.model';
import { TypeAttraction } from '../models/enum/TypeAttraction.enum';
import { Locality } from '../models/locality.model';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {
  private apiUrl = 'http://localhost:8092/attraction';

  constructor(private http: HttpClient) {}

  getAttractions(typeAttraction?: TypeAttraction, localityId?: number): Observable<{ attractions: Attraction[] }> {
    let url = `${this.apiUrl}/read`;

    let params = [];
    
    if (typeAttraction) {
        params.push(`typeAttraction=${typeAttraction}`);
    }
    if (localityId) {
        params.push(`localityId=${localityId}`);
    }

    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }

    return this.http.get<{ attractions: Attraction[] }>(url);
  } 

  createAttraction(attraction: any): Observable<any> {
    let url = `${this.apiUrl}/create`;
    return this.http.post(url, attraction, { responseType: 'text' });
  }

  updateAttraction(attractionId: number, updatedAttraction: any): Observable<any> {
    const url = `${this.apiUrl}/update/${attractionId}`
    return this.http.put(url, updatedAttraction, { responseType: 'text' });
  }

  deleteAttraction(attractionId: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${attractionId}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
