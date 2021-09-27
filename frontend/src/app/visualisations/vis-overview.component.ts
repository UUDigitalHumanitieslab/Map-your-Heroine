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
  plots = ['genderplot', 'ageplot', 'roleplot', 'narratorplot', 'focaliserplot'];

  mediumOptions = [...MEDIUM_OPTIONS, 'other'];
  genderOptions = GENDER_OPTIONS;
  currentFilters: any;
  numberOfResponses: number;
  plotData: any;

  filterForm = new FormGroup({
    work_medium: new FormArray([]),
    hero_gender: new FormArray([])
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.mediumOptions.forEach(response =>
      (this.filterForm.get('work_medium') as FormArray).push(new FormControl(response))
    );
    this.genderOptions.forEach(response =>
      (this.filterForm.get('hero_gender') as FormArray).push(new FormControl(response.value))
    );
    this.currentFilters = this.filterForm.value;

    this.submitFilters();

  }

  openTab(event: any, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName('content-tab');
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tab');
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' is-active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.className += ' is-active';
  }

  onCheckboxChange(name, value, event) {
    const checkArray: FormArray = this.filterForm.get(name) as FormArray;
    if (event.target.checked) {
      checkArray.push(new FormControl(value));
    }
    else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
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
