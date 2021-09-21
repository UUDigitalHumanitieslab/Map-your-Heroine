import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Restangular } from 'ngx-restangular';
import { Subscription } from 'rxjs';
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

  showAdaptationOf = false;

  workForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    medium: new FormControl('', [Validators.required]),
    pub_year: new FormControl('', [Validators.required]),
    pub_country: new FormControl('', [Validators.required]),
    is_source: new FormControl(true, [Validators.required]),
    adaptation_of: new FormControl(''),
    environment: new FormControl('', [Validators.required]),
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

  ngOnDestroy() {
    this.subscriptions$.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    this.httpError = undefined;
    alert(JSON.stringify(this.workForm.value, null, 2));
    const workFormData = this.workForm.value as IWork;
    this.restangular.all('works')
      .post(workFormData).subscribe(
        newWork => this.addWork.emit(newWork),
        errorResponse => this.httpError = errorResponse
      );
  }

  onAdaptationChange(change: boolean) {
    this.showAdaptationOf = !change;
  }

}
