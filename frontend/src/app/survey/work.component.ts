import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable, Subscription } from 'rxjs';
import { Work, MEDIUM_OPTIONS, ENVIRONMENT_OPTIONS } from '../models/work';
import * as _ from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mh-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit, OnDestroy {

  subscriptions$: Subscription[] = [];

  works: Work[];
  newWork: Work = { title: '', medium: 'novel', author: '', pub_year: 2021, pub_country: '', is_source: true, environment: 'unknown' };

  existingWorksOptions = [];

  mediumOptions = MEDIUM_OPTIONS.map(m => ({ label: m, value: m }));
  environmentOptions = ENVIRONMENT_OPTIONS.map(m => ({ label: m, value: m }));

  showAdaptationOf = false;

  workForm = new FormGroup({
    title: new FormControl(),
    author: new FormControl(),
    medium: new FormControl(),
    pub_year: new FormControl(),
    pub_country: new FormControl(),
    source_or_adaptation: new FormControl(),
    adaptation_of: new FormControl(),
    environment: new FormControl(),
  });

  constructor(private restangular: Restangular) { }

  ngOnInit() {
    this.subscriptions$.push(
      this.restangular.all('works').getList().subscribe(
        works => {
          this.works = works;
          this.existingWorksOptions = works.map(w => ({
            label: `${w.title} - ${w.medium} (${w.pub_year})`,
            value: w.id
          }));
        }
      )
    );
    this.workForm.controls.source_or_adaptation.valueChanges.subscribe(change => this.onAdaptationChange(change));

  }

  ngOnDestroy() {
    this.subscriptions$.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    alert(JSON.stringify(this.workForm.value));
  }

  onAdaptationChange(change) {
    this.showAdaptationOf = change === 'adaptation'
  }

  workExists() {
    return this.newWork.title &&
      _.some(this.works, w => w.title.toLowerCase() === this.newWork.title.toLowerCase());

  }

}
