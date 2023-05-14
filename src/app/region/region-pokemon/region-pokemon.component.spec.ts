import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionPokemonComponent } from './region-pokemon.component';

describe('RegionPokemonComponent', () => {
  let component: RegionPokemonComponent;
  let fixture: ComponentFixture<RegionPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegionPokemonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
