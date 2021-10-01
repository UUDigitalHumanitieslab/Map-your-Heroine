import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Restangular } from 'ngx-restangular';
import { Subject } from 'rxjs';
import { IHero } from '../models/hero';
import { IResponse } from '../models/response';
import { IWork } from '../models/work';

@Component({
  selector: 'mh-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  httpError: HttpErrorResponse = undefined;
  faPlus = faPlus;

  works$: Subject<IWork[]>;
  heroes$: Subject<IHero[]>;
  existingWork: IWork;
  existingHero: IHero;
  displayCreateWork = false;
  displayCreateHero = false;
  heroChosen = false;

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

  onWorkAdded(work: IWork) {
    this.fetchWorks();
    this.works$.subscribe(
      works => {
        this.existingWork = works.find(w => w.id === work.id);
      }
    );
    this.displayCreateWork = false;
  }

  onHeroAdded(hero: IHero) {
    // Refresh works, reset existingWork and set hero
    // Slightly hacky but it works
    this.fetchWorks();
    this.works$.subscribe(
      works => {
        this.existingWork = works.find(w => w.id === this.existingWork.id);
        this.existingHero = this.existingWork.heroes.find(h => h.id === hero.id);
      }
    );
    this.displayCreateHero = false;
  }

  onWorkChange() {
    // Unset hero when changing work
    this.existingHero = undefined;
  }

  onChooseHero() {
    this.heroChosen = true;
  }

  onGoBack() {
    this.heroChosen = false;
    this.fetchWorks();
    this.fetchWorks();
    this.works$.subscribe(
      works => {
        this.existingWork = works.find(w => w.id === this.existingWork.id);
        this.existingHero = this.existingWork.heroes.find(h => h.id === this.existingHero.id);
      }
    );
  }

  onSurveyCompleted(data) {
    this.httpError = undefined;

    const response = {
      work: this.existingWork.id,
      hero: this.existingHero.id,
      responses: data,
    } as unknown as IResponse;

    this.restangular.all('responses')
      .post(response).subscribe(
        res => {},
        err => {
          this.httpError = err;
          console.log(this.httpError.message);
        }
      );
  }

}
