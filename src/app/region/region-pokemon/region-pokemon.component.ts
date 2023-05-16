import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Region } from 'src/app/region/region';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-region-pokemon',
  templateUrl: './region-pokemon.component.html',
  styleUrls: ['./region-pokemon.component.scss'],
})
export class RegionPokemonComponent implements OnInit {
  pokemonLoaded: boolean = false;
  pokemon: any[] = [];
  region!: Region;
  pageLimit: number = 9;
  pageIndex: number = 1;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRegion();    
  }

  getRegion(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pokemonService.getRegionById(id).subscribe((region: Region) => {
      this.region = region;      
      this.pokemon = [];
      this.pageIndex = this.region.startIndex

      this.getPokemon();
      
    });    
  }

  getPokemon(): void {

    this.pokemonLoaded = false;
    let pageLimit = this.pageLimit;

    if((this.pageIndex + this.pageLimit) > this.region.endIndex) {
      pageLimit = this.region.endIndex - this.pageIndex;
    }

    this.pokemonService
        .getPokemonList(this.pageIndex, pageLimit)
        .subscribe((response: any) => {
          let pokemonRequest = response.results.map((result: any) => {
            return this.pokemonService.getByUrl(result.url);
          });

          forkJoin(pokemonRequest).subscribe((pokemon: any) => {
            pokemon = this.sortPokemon(pokemon);
            
            this.pokemon.push(...pokemon);           

            setTimeout(() => {
              this.pokemonLoaded = true;
            }, 1000);
            
            this.pageIndex += this.pageLimit;
          });
        });
  }

  sortPokemon(pokemon: any[]): any[] {
    return pokemon.sort((first, second) => first.id - second.id);
  }
}
