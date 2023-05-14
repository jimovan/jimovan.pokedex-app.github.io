import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemonLoaded: boolean = false;
  pokemon: any;
  pokemonImage!: string;
  damageRelations!: any;
  evolutionsList!: any;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    setTimeout(() => {
      this.pokemonService.getPokemonById(id).pipe(switchMap(pokemonResult => {
  
        this.pokemon = pokemonResult;
        this.pokemonImage = this.pokemon.sprites.other['official-artwork'].front_default;
  
        return forkJoin([this.pokemonService.getByUrl(pokemonResult.types[0].type.url),          
          this.pokemonService.getPokemonEvolutions(id, pokemonResult.species.url)])
  
      })).subscribe(([typeDamages, evolutions]) => {

        this.damageRelations = typeDamages.damage_relations;                
        console.log('Damages : ', this.damageRelations);

        this.evolutionsList = evolutions;
        console.log('Evolutions : ', this.evolutionsList);

        this.pokemonLoaded = true;
      });
    }, 2000);
    
  }

  hasPokemonLoaded(): boolean {
    return this.pokemonLoaded;
  }
}
