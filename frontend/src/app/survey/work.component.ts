import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable, Subscription } from 'rxjs';
import { Work, MEDIUM_OPTIONS, ENVIRONMENT_OPTIONS } from '../models/work';
import * as _ from 'lodash';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    medium: new FormControl('', [Validators.required]),
    pub_year: new FormControl('', [Validators.required]),
    pub_country: new FormControl('', [Validators.required]),
    source_or_adaptation: new FormControl('', [Validators.required]),
    adaptation_of: new FormControl(''),
    environment: new FormControl('', [Validators.required]),
  });

  constructor(private restangular: Restangular) { }

  ngOnInit() {
    this.subscriptions$.push(
      this.restangular.all('works').getList().subscribe(
        works => {
          this.works = works;
          this.existingWorksOptions = works.map(w => ({
            label: `${w.title} - ${w.medium} (${w.pub_year})`,
            value: w
          }));
        }
      )
    );
    this.subscriptions$.push(
      this.workForm.controls.source_or_adaptation.valueChanges
        .subscribe(change => this.onAdaptationChange(change))
    );


  }

  ngOnDestroy() {
    this.subscriptions$.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    alert(JSON.stringify(this.workForm.value, null, 2));
  }

  onAdaptationChange(change) {
    this.showAdaptationOf = change === 'adaptation'
  }

  workExists() {
    return this.newWork.title &&
      _.some(this.works, w => w.title.toLowerCase() === this.newWork.title.toLowerCase());

  }

}
