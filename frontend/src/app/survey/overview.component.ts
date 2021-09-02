import { Component, OnInit, ViewChild } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Restangular } from 'ngx-restangular';
import { Dropdown } from 'primeng/dropdown';
import { Subject } from 'rxjs';
import { IHero } from '../models/hero';
import { IWork } from '../models/work';

@Component({
  selector: 'mh-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  faPlus = faPlus;

  works$: Subject<IWork[]>;
  heroes$: Subject<IHero[]>;
  existingWork: IWork;
  existingHero: IHero;
  displayCreateWork = false;
  displayCreateHero = false;

  constructor(private restangular: Restangular) { }

  ngOnInit() {
    this.fetchWorks();
    this.fetchHeroes();
  }

  fetchWorks() {
    this.works$ = this.restangular.all('works').getList();
  }

  fetchHeroes() {
    this.heroes$ = this.restangular.all('heroes').getList();
  }

  showCreateWork() {
    this.displayCreateWork = true;
  }

  onWorkAdded(work: IWork) {
    // Todo set this in the dropdown
    this.fetchWorks();
    setTimeout(() => this.existingWork = undefined, 0);
    this.displayCreateWork = false;

  }

  showCreateHero() {
    this.displayCreateHero = true;
  }

  onHeroAdded(hero: IHero) {
    this.fetchHeroes();
    setTimeout(() => this.existingHero = undefined, 0);
    this.displayCreateHero = false;
  }

}
