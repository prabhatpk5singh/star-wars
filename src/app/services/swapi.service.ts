import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<any>(`${this.apiUrl}/people`).pipe( // Changed to backticks here
      map(response => response.results)
    );
  }

  getCharacterDetails(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}
