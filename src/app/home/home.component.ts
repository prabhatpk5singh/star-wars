import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../services/swapi.service';
import { map } from 'rxjs/operators';

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

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.swapiService.getCharacters().subscribe((characters: any[]) => {
      this.characters = characters;
      this.filteredCharacters = this.characters;
    });
  }

  applyFilters(): void {
    this.filteredCharacters = this.characters.filter((character: any) => {
      const birthYear = parseInt(character.birth_year);
      return (!this.filterCriteria.movie || character.films.some((filmUrl: string) => {
        return this.swapiService.getMovieDetails(filmUrl).pipe(
          map((movie: any) => movie.title.toLowerCase().includes(this.filterCriteria.movie.toLowerCase()))
        );
      })) &&
      (!this.filterCriteria.species || character.species.includes(this.filterCriteria.species)) &&
      (!this.filterCriteria.vehicle || character.vehicles.some((vehicleUrl: string) => {
        return vehicleUrl.toLowerCase().includes(this.filterCriteria.vehicle.toLowerCase());
      })) &&
      (!this.filterCriteria.starship || character.starships.some((starshipUrl: string) => {
        return starshipUrl.toLowerCase().includes(this.filterCriteria.starship.toLowerCase());
      })) &&
      (!this.filterCriteria.birthYearRange.min || birthYear >= this.filterCriteria.birthYearRange.min) &&
      (!this.filterCriteria.birthYearRange.max || birthYear <= this.filterCriteria.birthYearRange.max);
    });
  }
}
