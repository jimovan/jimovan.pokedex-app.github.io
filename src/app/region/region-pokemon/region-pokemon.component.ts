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
      this.pageIndex = this.region.startIndex

      this.getPokemon(this.region.startIndex);
      
    });    
  }

  getPokemon(startIndex: number): void {

    this.pokemonLoaded = false;
    this.pokemon = [];
    let pageLimit = this.pageLimit;

    if((this.pageIndex + this.pageLimit) > this.region.endIndex) {
      pageLimit = this.region.endIndex - startIndex;
    }

    this.pokemonService
        .getPokemonList(startIndex, pageLimit)
        .subscribe((response: any) => {
          let pokemonRequest = response.results.map((result: any) => {
            return this.pokemonService.getByUrl(result.url);
          });

          forkJoin(pokemonRequest).subscribe((pokemon: any) => {
            this.pokemon = pokemon;
            this.sortPokemon();

            this.pokemonLoaded = true;   
          });
        });
  }

  sortPokemon(): void {
    this.pokemon.sort((first, second) => first.id - second.id);
  }

  nextPage(): void {
    this.pageIndex += this.pageLimit;
    this.getPokemon(this.pageIndex);
  }

  previousPage(): void {
    this.pageIndex -= this.pageLimit;
    this.getPokemon(this.pageIndex);
  }
}
