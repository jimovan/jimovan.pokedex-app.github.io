import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/pokemon.service';
import { Region } from '../region';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss'],
})
export class RegionListComponent implements OnInit {
  regions: Region[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(): void {
    this.pokemonService
      .getRegions()
      .subscribe((regions) => (this.regions = regions));
  }
}
