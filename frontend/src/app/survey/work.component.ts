import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
import { COUNTRIES } from '../models/countries';
import { ENVIRONMENT_OPTIONS, IWork, MEDIUM_OPTIONS } from '../models/work';

@Component({
  selector: 'mh-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription[] = [];
  httpError: HttpErrorResponse = undefined;

  displayHelp = {
    is_source: false,
    adaptation_of: false,
    environment: false,
  };

  authorStrings = {
    novel: 'Author(s)',
    film: 'Director(s)',
    'tv-series': 'Director(s)',
    vlog: 'Creator(s)',
    comic: 'Author(s)',
    'fan fiction': 'Author(s)',
    music: 'Composer(s)',
    ballet: 'Author(s)',
    game: 'Writer(s)',
  };

  faQuestion = faQuestion;

  works: IWork[];

  existingWorksOptions = [];
  filteredWorks = [];
  mediumOptions = MEDIUM_OPTIONS.map(m => ({ label: m, value: m }));
  environmentOptions = ENVIRONMENT_OPTIONS;
  countryOptions = COUNTRIES.concat([{name: 'Other', code: 'OTHER'}, {name: 'Unknown', code: 'UNKNOWN'}]);
  filteredCountries = [];

  showAdaptationOf = false;

  workForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    medium: new FormControl('', [Validators.required]),
    mediumOther: new FormControl({value: '', disabled: true}),
    pub_year: new FormControl('', [Validators.required]),
    pub_country: new FormControl('', [Validators.required]),
    is_source: new FormControl(true, [Validators.required]),
    adaptation_of: new FormControl(''),
    environment: new FormControl('', [Validators.required]),
    environmentOther: new FormControl({value: '', disabled: true})
  });

  @Output()
  addWork = new EventEmitter<IWork>();

  constructor(private restangular: Restangular) { }

  ngOnInit() {
    this.subscriptions$.push(
      this.restangular.all('works').getList().subscribe(
        (works: IWork[]) => {
          this.works = works;
          this.existingWorksOptions = works.map(w => ({
            label: `${w.title} - ${w.medium} (${w.pub_year})`,
            value: w
          }));
        }
      )
    );
    this.subscriptions$.push(
      this.workForm.controls.is_source.valueChanges
        .subscribe(change => this.onAdaptationChange(change))
    );
    this.subscriptions$.push(
      this.workForm.controls.medium.valueChanges
        .subscribe(change => this.onMediumChange(change))
    );
    this.subscriptions$.push(
      this.workForm.controls.environment.valueChanges
        .subscribe(change => this.onEnvironmentChange(change))
    );
  }

  filterCountry(event) {
    let filtered : any[] = [];
    const query = event.query;

    for (const country of this.countryOptions) {
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
            filtered.push(country);
        }
    }
    this.filteredCountries = filtered;
  }

  filterWork(event) {
    let filtered : any[] = [];
    const query = event.query;

    for (const work of this.existingWorksOptions) {
        if (work.label.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
            filtered.push(work);
        }
    }
    this.filteredWorks = filtered;
  }

  onAdaptationChange(change: boolean) {
    this.showAdaptationOf = !change;
    if (!change) {
      this.workForm.controls.adaptation_of.setValidators([Validators.required]);
    } else {
      this.workForm.controls.adaptation_of.clearValidators();
    }
    this.workForm.controls.adaptation_of.updateValueAndValidity();
  }

  onMediumChange(change: string): void {
    const control = this.workForm.get('mediumOther');
    if (change === 'other') {
      control.enable();
    } else {
      control.disable();
    }
  }

  onEnvironmentChange(change: string): void {
    const control = this.workForm.get('environmentOther');
    if (change === 'other') {
      control.enable();
    } else {
      control.disable();
    }
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    this.httpError = undefined;
    const workFormData = this.workForm.value as IWork;
    workFormData.adaptation_of = this.workForm.controls.adaptation_of.value ? this.workForm.controls.adaptation_of.value.value.id : null;
    workFormData.pub_country = workFormData.pub_country['name'];
    if (workFormData.medium === 'other') {
      workFormData.medium = this.workForm.controls.mediumOther.value;
    }
    if (workFormData.environment === 'other') {
      workFormData.environment = this.workForm.controls.environmentOther.value;
    }
    console.log(workFormData);
    this.restangular.all('works')
      .post(workFormData).subscribe(
        newWork => this.addWork.emit(newWork),
        errorResponse => {
          this.httpError = errorResponse;
          console.log(this.httpError.message);
        }
      );
  }

  get authorString() {
    const selectedMedium = this.workForm.value.medium;
    if (selectedMedium in this.authorStrings) {
      return this.authorStrings[selectedMedium];
    }
    return 'Authors(s)';
  }

}
