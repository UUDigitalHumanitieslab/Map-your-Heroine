import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as Bokeh from '@bokeh/bokehjs/build/js/lib/embed';

@Component({
  selector: 'mh-vis-work',
  templateUrl: './vis-work.component.html',
  styleUrls: ['./vis-work.component.scss']
})
export class VisWorkComponent implements OnInit, OnChanges {
  plots = ['mediumplot', 'pubcountryplot'];

  @Input() filters: any;

  @ViewChild('mediumplot') mediumPlot;
  @ViewChild('pubcountryplot') pubCountryPlot;

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
    if (this.mediumPlot !== undefined) {
      this.mediumPlot.nativeElement.innerHTML = '';
    }

    if (this.pubCountryPlot !== undefined) {
      this.pubCountryPlot.nativeElement.innerHTML = '';
    }
  }

  applyFilters() {
    this.clearPlots();

    this.plots.forEach(plot =>
      this.embedFilteredPlot(plot, this.filters)
      );
  }

}
