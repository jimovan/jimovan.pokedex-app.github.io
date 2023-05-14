import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionPokemonComponent } from './region/region-pokemon/region-pokemon.component';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';
import { RegionListComponent } from './region/region-list/region-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'regions', pathMatch: 'full' },
  { path: 'regions', component: RegionListComponent },
  { path: 'region-pokemon/:id', component: RegionPokemonComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
