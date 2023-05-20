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
  isFirstLoad: boolean = true;
  isLoading: boolean = false;
  pokemon: any[] = [];
  region!: Region;
  pageLimit: number = 80;
  offset: number = 1;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRegion();    
  }

  getRegion(): void{

    this.route.params.subscribe(() => {
      this.isFirstLoad = true;
      const id = Number(this.route.snapshot.paramMap.get('id'));

      this.pokemonService.getRegionById(id).subscribe((region: Region) => {
        this.region = region;      
        this.pokemon = [];
        this.offset = this.region.startIndex
  
        this.getPokemon();        
      });    
    });    
  }

  getPokemon(): void {

    this.isLoading = true;
    let pageLimit = this.pageLimit;

    if((this.offset + this.pageLimit) > this.region.endIndex) {
      pageLimit = this.region.endIndex - this.offset;
    }

    this.pokemonService
        .getPokemonList(this.offset, pageLimit)
        .subscribe((response: any) => {
          let pokemonRequest = response.results.map((result: any) => {
            return this.pokemonService.getByUrl(result.url);
          });

          forkJoin(pokemonRequest).subscribe((pokemon: any) => {
            pokemon = this.sortPokemon(pokemon);

            setTimeout(() => {
              this.isLoading = false;
              this.offset += this.pageLimit;
              this.isFirstLoad = false;

              this.pokemon.push(...pokemon);
            }, 2000);
          });
        });
  }

  sortPokemon(pokemon: any[]): any[] {
    return pokemon.sort((first, second) => first.id - second.id);
  }
}
