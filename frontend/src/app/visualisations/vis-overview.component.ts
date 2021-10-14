import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MEDIUM_OPTIONS } from '../models/work';
import { GENDER_OPTIONS } from '../models/hero';

@Component({
  selector: 'mh-vis-overview',
  templateUrl: './vis-overview.component.html',
  styleUrls: ['./vis-overview.component.scss']
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
  plotData: any;

  filterForm = new FormGroup({
    work_medium: new FormArray([]),
    work_is_source: new FormArray([]),
    hero_gender: new FormArray([])
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.mediumOptions.forEach(response =>
      (this.filterForm.get('work_medium') as FormArray).push(new FormControl(response))
    );
    this.isSourceOptions.forEach(response =>
      (this.filterForm.get('work_is_source') as FormArray).push(new FormControl(response.value))
    );
    this.genderOptions.forEach(response =>
      (this.filterForm.get('hero_gender') as FormArray).push(new FormControl(response.value))
    );
    this.currentFilters = this.filterForm.value;

    this.submitFilters();

  }

  onCheckboxChange(name, value, event) {
    const checkArray: FormArray = this.filterForm.get(name) as FormArray;
    if (event.target.checked) {
      checkArray.push(new FormControl(value));
    }
    else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl, i: number) => {
        if (item.value === value) {
          checkArray.removeAt(i);
          return;
        }
      });
    }
  }

  formIsValid() {
    const genderSelected = (this.filterForm.get('hero_gender') as FormArray).length > 0;
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
