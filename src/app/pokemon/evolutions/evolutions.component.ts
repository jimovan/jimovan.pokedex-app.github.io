import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.scss']
})
export class EvolutionsComponent implements OnInit {

  @Input() evolutions: any;

  constructor() { }

  ngOnInit(): void {
  }

}
