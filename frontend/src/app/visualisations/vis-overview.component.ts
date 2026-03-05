import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MEDIUM_OPTIONS } from '../models/work';
import { GENDER_OPTIONS } from '../models/hero';

@Component({
    selector: 'mh-vis-overview',
    templateUrl: './vis-overview.component.html',
    styleUrls: ['./vis-overview.component.scss'],
    standalone: false
})
export class VisOverviewComponent implements OnInit {
  activeTab = 'work';
  plots = ['genderplot', 'ageplot', 'roleplot', 'narratorplot', 'focaliserplot'];

  mediumOptions = [...MEDIUM_OPTIONS, 'other'];
  isSourceOptions = [
    { label: 'Source works', value: true },
    { label: 'Adaptations', value: false }
  ];
  genderOptions = GENDER_OPTIONS;
  currentFilters: any;
  numberOfResponses: number;
  plotData: any = {
    n_works: undefined,
    n_heroes: undefined,
    n_responses: undefined,
  };

  filterForm = new UntypedFormGroup({
    work_medium: new UntypedFormArray([]),
    work_is_source: new UntypedFormArray([]),
    hero_gender: new UntypedFormArray([])
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.mediumOptions.forEach(response =>
      (this.filterForm.get('work_medium') as UntypedFormArray).push(new UntypedFormControl(response))
    );
    this.isSourceOptions.forEach(response =>
      (this.filterForm.get('work_is_source') as UntypedFormArray).push(new UntypedFormControl(response.value))
    );
    this.genderOptions.forEach(response =>
      (this.filterForm.get('hero_gender') as UntypedFormArray).push(new UntypedFormControl(response.value))
    );
    this.currentFilters = this.filterForm.value;

    this.submitFilters();

  }

  onCheckboxChange(name, value, event) {
    const checkArray: UntypedFormArray = this.filterForm.get(name) as UntypedFormArray;
    if (event.target.checked) {
      checkArray.push(new UntypedFormControl(value));
    }
    else {
      let i: number = 0;
      checkArray.controls.forEach((item: UntypedFormControl, i: number) => {
        if (item.value === value) {
          checkArray.removeAt(i);
          return;
        }
      });
    }
  }

  formIsValid() {
    const genderSelected = (this.filterForm.get('hero_gender') as UntypedFormArray).length > 0;
    return genderSelected;
  }

  submitFilters() {
    this.currentFilters = this.filterForm.value;

    this.http.post('/api/results/plots', this.currentFilters).subscribe(
      res => {
        this.plotData = res;
        this.numberOfResponses = this.plotData.n_responses;
      },
      err => console.log(err)
    );
  }

}
