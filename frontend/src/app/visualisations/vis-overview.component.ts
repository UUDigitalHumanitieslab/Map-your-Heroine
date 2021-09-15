import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as Bokeh from '@bokeh/bokehjs/build/js/lib/embed';
import { GENDER_OPTIONS } from '../models/hero';

@Component({
  selector: 'mh-vis-overview',
  templateUrl: './vis-overview.component.html',
  styleUrls: ['./vis-overview.component.scss']
})
export class VisOverviewComponent implements OnInit {
  plots = ['genderplot', 'ageplot', 'roleplot', 'narratorplot', 'focaliserplot'];
  genderOptions = GENDER_OPTIONS;

  @ViewChild('genderplot') genderPlot;
  @ViewChild('ageplot') agePlot;
  @ViewChild('roleplot') rolePlot;
  @ViewChild('narratorplot') narratorPlot;
  @ViewChild('focaliserplot') focaliserPlot;

  filterForm = new FormGroup({
    hero_gender: new FormArray([])
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.plots.forEach(plot =>
      this.embedPlot(plot)
      );

    this.genderOptions.forEach(response =>
      (this.filterForm.get('hero_gender') as FormArray).push(new FormControl(response.value))
    );

  }

  embedPlot(name: string) {
    this.http.get(`/api/results/${name}`).subscribe(
      res => {
        Bokeh.embed_item(res, name);
      },
      err => console.error(err)
    );
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

  embedFilteredPlot(name: string, filters: any) {
    this.http.post(`/api/results/${name}`, filters).subscribe(
      res => {
        Bokeh.embed_item(res, name);
      },
      err => console.error(err)
    );
  }

  clearPlots() {
    this.genderPlot.nativeElement.innerHTML = '';
    this.agePlot.nativeElement.innerHTML = '';
    this.rolePlot.nativeElement.innerHTML = '';
    this.narratorPlot.nativeElement.innerHTML = '';
    this.focaliserPlot.nativeElement.innerHTML = '';
  }

  applyFilters() {
    const filters = this.filterForm.value;

    alert(JSON.stringify(filters));

    this.clearPlots();

    this.plots.forEach(plot =>
      this.embedFilteredPlot(plot, filters)
      );
  }

}
