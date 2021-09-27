import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  works: IWork[];

  existingWorksOptions = [];
  mediumOptions = MEDIUM_OPTIONS.map(m => ({ label: m, value: m }));
  environmentOptions = ENVIRONMENT_OPTIONS.map(m => ({ label: m, value: m }));
  countryOptions = COUNTRIES.concat([{name: 'Other', code: 'OTHER'}, {name: 'Unknown', code: 'UNKNOWN'}]);
  filteredCountries = [];

  showAdaptationOf = false;

  workForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    medium: new FormControl(undefined, [Validators.required]),
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
  }

  filterCountry(event) {
    let filtered : any[] = [];
    const query = event.query;

    for (const country of this.countryOptions) {
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            filtered.push(country);
        }
    }
    this.filteredCountries = filtered;
  }

  onAdaptationChange(change: boolean) {
    this.showAdaptationOf = !change;
  }

  updateEnvironmentOther(): void {
    const control = this.workForm.get('environmentOther');
    if (this.selectedEnvironment === 'other') {
      control.enable();
    } else {
      control.disable();
    }
  }

  get selectedEnvironment(): string {
    return this.workForm.get('environment').value;
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    this.httpError = undefined;
    const workFormData = this.workForm.value as IWork;
    workFormData.pub_country = workFormData.pub_country['name'];
    if (workFormData.environment === 'other') {
      workFormData.environment = this.workForm.get('environmentOther').value;
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

}
