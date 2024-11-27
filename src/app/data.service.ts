import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; // Mock API URL

  constructor(private http: HttpClient) {}

  getTrucks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trucks`);
  }

  getMatches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/matches`);
  }

  addTruck(newTruck: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/trucks`, newTruck);
  }
}