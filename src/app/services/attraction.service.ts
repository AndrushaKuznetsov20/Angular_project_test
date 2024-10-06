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

  getAttractions(typeAttraction?: TypeAttraction): Observable<{ attractions: Attraction[] }> {
    let url = `${this.apiUrl}/read`;
  
    if (typeAttraction) {
      url += `?typeAttraction=${typeAttraction}`;
    }
  
    return this.http.get<{ attractions: Attraction[] }>(url);
  }
  
}
