import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assistance } from '../models/assistance.model';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService{
  private apiUrl = 'http://localhost:8092/assistance';

  constructor(private http: HttpClient) {}

  getAssistances(): Observable<{ assistances: Assistance[] }> {
    let url = `${this.apiUrl}/read`;
    return this.http.get<{ assistances: Assistance[] }>(url);
  }

  createAssistance(assistance: any): Observable<any> {
    console.log(assistance);
    let url = `${this.apiUrl}/create`;
    return this.http.post(url, assistance, { responseType: 'text' });
  }

  addAttractionToAssistance(assistanceId: number, attractionId: number): Observable<any> {
    const url = `${this.apiUrl}/addAttraction/${attractionId}/${assistanceId}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }

  deleteAssistance(assistanceId: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${assistanceId}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
