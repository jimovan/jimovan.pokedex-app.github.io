import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { Region } from './region/region';
import { REGIONS } from './region/region-list';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokeApiUrl = 'https://pokeapi.co/api/v2';
  private pokemonUrl = `${this.pokeApiUrl}/pokemon`;
  
  evolutionsList: any[] = [];

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    const regions = of(REGIONS);
    return regions;
  }

  getRegionById(id: number): Observable<Region> {
    const region = REGIONS.find((r) => r.id === id)!;
    return of(region);
  }

  getPokemonList(offset: number, limit: number = 9): Observable<any> {
    return this.http.get(
      `${this.pokemonUrl}?limit=${limit}&offset=${offset - 1}`
    );
  }

  getPokemonByName(name: string) {
    return this.getByUrl(`${this.pokemonUrl}/${name}`);
  }

  getPokemonById(id: number) : Observable<any> {
    return this.getByUrl(`${this.pokemonUrl}/${id}`);
  }

  getByUrl(url: string) : Observable<any> {
    return this.http.get(url);
  }

  getPokemonEvolutions(id: number, speciesUrl: any) : Observable<any> {

    this.evolutionsList = [];
    let pokemonEvolutions: any[] = [];

    return new Observable(subscriber => {
      this.getByUrl(speciesUrl).subscribe((species: any) => {
        this.getByUrl(species.evolution_chain.url).subscribe((chain: any) => {

          this.getEvolutions(chain.chain);
    
          let pokemon = this.evolutionsList.map((ev: any) => {
              let urlFragments = ev.url.split("/");
              return this.getPokemonById(urlFragments[urlFragments.length - 2]);
          });

          forkJoin(pokemon).subscribe((p) => {
            p.forEach(e => {
              pokemonEvolutions.push((
              { 
                Name: e.name,
                Image: e.sprites.other['official-artwork'].front_default,
                Id: e.id,
                IsCurrentPokemon: e.id == id
               }));
            });

            subscriber.next(pokemonEvolutions);

            subscriber.complete();

          });
        });
      });
    });
  }

  private getEvolutions(chain: any): void {

    this.evolutionsList.push(chain.species);

    if(chain.evolves_to.length > 0) {      

      if(chain.evolves_to.length > 1) {

        for(let i = 0; i < chain.evolves_to.length; i++){
          this.evolutionsList.push(chain.evolves_to[i].species);
        }      
      }     
      
      this.getEvolutions(chain.evolves_to[0]);
    }

    return;
  }
}
