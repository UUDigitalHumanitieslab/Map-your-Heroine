import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
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

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;

  works$: Subject<IWork[]>;
  heroes$: Subject<IHero[]>;
  existingWork: IWork;
  existingHero: IHero;
  adaptedWork: IWork;
  displayCreateWork = false;
  displayCreateHero = false;
  heroChosen = false;

  personalResponse: any;
  createdNewWork = false;
  createdNewHero = false;
  formCompleted = false;

  displayConsentStatement = false;
  consentGiven = true;

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
    this.createdNewWork = true;
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
    this.createdNewHero = true;
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

    this.fetchWorks();
    this.works$.subscribe(works => {
      if (this.existingWork.adaptation_of) {
        this.adaptedWork = works.find(w => w.id === this.existingWork.adaptation_of);
      }
    });
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
    this.personalResponse = data;

    this.httpError = undefined;

    const response = {
      work: this.existingWork.id,
      hero: this.existingHero.id,
      responses: data,
    } as unknown as IResponse;

    this.restangular.all('responses')
      .post(response).subscribe(
        res => {
          this.formCompleted = true;
        },
        err => {
          this.httpError = err;
          console.log(this.httpError.message);
        }
      );
  }

}
