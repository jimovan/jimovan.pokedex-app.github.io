import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-damage',
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.scss']
})
export class DamageComponent implements OnInit {

  @Input() damageTitle = "";
  @Input() damageFromList: any[] = [];
  @Input() damageToList: any[] = [];

  hasDamageLists: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.hasDamageLists = this.damageFromList.length > 0 || this.damageToList.length > 0
  }

}
