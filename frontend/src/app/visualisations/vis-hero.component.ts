import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as Bokeh from '@bokeh/bokehjs/build/js/lib/embed';

@Component({
  selector: 'mh-vis-hero',
  templateUrl: './vis-hero.component.html',
  styleUrls: ['./vis-hero.component.scss']
})
export class VisHeroComponent implements OnInit, OnChanges {
  plots = ['genderplot', 'ageplot', 'roleplot', 'narratorplot', 'focaliserplot'];

  @Input() filters: any;

  @ViewChild('genderplot') genderPlot;
  @ViewChild('ageplot') agePlot;
  @ViewChild('roleplot') rolePlot;
  @ViewChild('narratorplot') narratorPlot;
  @ViewChild('focaliserplot') focaliserPlot;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.applyFilters();
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
    if (this.genderPlot !== undefined) {
      this.genderPlot.nativeElement.innerHTML = '';
    }

    if (this.agePlot !== undefined) {
      this.agePlot.nativeElement.innerHTML = '';
    }

    if (this.rolePlot !== undefined) {
      this.rolePlot.nativeElement.innerHTML = '';
    }

    if (this.narratorPlot !== undefined) {
      this.narratorPlot.nativeElement.innerHTML = '';
    }

    if (this.focaliserPlot !== undefined) {
      this.focaliserPlot.nativeElement.innerHTML = '';
    }
  }

  applyFilters() {
    this.clearPlots();

    this.plots.forEach(plot =>
      this.embedFilteredPlot(plot, this.filters)
      );
  }

}
