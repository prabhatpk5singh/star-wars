import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// other imports

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  character: any = {};
  films: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];
  homeworldName: string = '';
  speciesName: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://swapi.dev/api/people/${id}`)
      .subscribe((character: any) => {
        this.character = character;
        this.loadFilms(character.films);
        this.loadVehicles(character.vehicles);
        this.loadStarships(character.starships);
        this.loadHomeworld(character.homeworld);
        this.loadSpecies(character.species[0]);
      });
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }
  loadFilms(filmUrls: string[]) {
    filmUrls.forEach(url => {
      this.http.get(url).subscribe((film: any) => {
        this.films.push(film);
      });
    });
  }

  loadVehicles(vehicleUrls: string[]) {
    vehicleUrls.forEach(url => {
      this.http.get(url).subscribe((vehicle: any) => {
        this.vehicles.push(vehicle);
      });
    });
  }

  loadStarships(starshipUrls: string[]) {
    starshipUrls.forEach(url => {
      this.http.get(url).subscribe((starship: any) => {
        this.starships.push(starship);
      });
    });
  }

  loadHomeworld(homeworldUrl: string) {
    this.http.get(homeworldUrl).subscribe((homeworld: any) => {
      this.homeworldName = homeworld.name;
    });
  }

  loadSpecies(speciesUrl: string) {
    this.http.get(speciesUrl).subscribe((species: any) => {
      this.speciesName = species.name;
    });
  }
}
