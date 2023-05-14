import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegionListComponent } from './region/region-list/region-list.component';
import { RegionPokemonComponent } from './region/region-pokemon/region-pokemon.component';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { DamageComponent } from './pokemon/damage/damage.component';
import { EvolutionsComponent } from './pokemon/evolutions/evolutions.component';

@NgModule({
  declarations: [
    AppComponent,
    RegionListComponent,
    RegionPokemonComponent,
    PokemonComponent,
    LoaderComponent,
    DamageComponent,
    EvolutionsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
