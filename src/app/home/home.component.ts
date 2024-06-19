import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  filterCriteria = {
    movie: '',
    species: '',
    vehicle: '',
    starship: '',
    birthYearRange: {
      min: 0,
      max: 9999
    }
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.http.get('https://swapi.dev/api/people/').subscribe((response: any) => {
      this.characters = response.results;
      this.filteredCharacters = this.characters;
    });
  }

  applyFilters(): void {
    this.filteredCharacters = this.characters.filter(character => {
      const birthYear = parseInt(character.birth_year);
      return (!this.filterCriteria.movie || character.films.some((film: string) => film.includes(this.filterCriteria.movie))) &&
             (!this.filterCriteria.species || character.species.includes(this.filterCriteria.species)) &&
             (!this.filterCriteria.vehicle || character.vehicles.includes(this.filterCriteria.vehicle)) &&
             (!this.filterCriteria.starship || character.starships.includes(this.filterCriteria.starship)) &&
             (!this.filterCriteria.birthYearRange.min || birthYear >= this.filterCriteria.birthYearRange.min) &&
             (!this.filterCriteria.birthYearRange.max || birthYear <= this.filterCriteria.birthYearRange.max);
    });
  }
}
