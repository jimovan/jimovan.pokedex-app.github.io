import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/pokemon.service';
import { Region } from '../region';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss'],
})
export class RegionListComponent implements OnInit {
  regions: Region[] = [];
  selectedRegionId!: number;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(): void {
    this.pokemonService
      .getRegions()
      .subscribe((regions) => (this.regions = regions));
  }

  onSelectedRegion() :void {
    if (this.selectedRegionId > 0) {
      this.router.navigate(["regions/region-pokemon", this.selectedRegionId]);
    }  
  }
}
