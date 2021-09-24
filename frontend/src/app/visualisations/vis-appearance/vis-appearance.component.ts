import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-appearance',
  templateUrl: './vis-appearance.component.html',
  styleUrls: ['./vis-appearance.component.scss']
})
export class VisAppearanceComponent implements OnInit, OnChanges {
  @Input() filters: any;

  attractivePlotData: any;
  appearanceBeautifulPlotData: any;
  appearanceWishlookedlikePlotData: any;
  appearanceInfluencefeelingsPlotData: any;
  appearanceImpactPlotData: any;
  appearanceAwarePlotData: any;

  likertPlotOptions = LIKERTPLOTOPTIONS;
  attractivePlotOptions = {
    aspectRatio: 3
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.http.post('/api/results/attractiveplotdata', this.filters).subscribe(
      res => this.attractivePlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/appearance-beautiful-plotdata', this.filters).subscribe(
      res => this.appearanceBeautifulPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/appearance-wishlookedlike-plotdata', this.filters).subscribe(
      res => this.appearanceWishlookedlikePlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/appearance-influencefeelings-plotdata', this.filters).subscribe(
      res => this.appearanceInfluencefeelingsPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/appearance-impact-plotdata', this.filters).subscribe(
      res => this.appearanceImpactPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/appearance-aware-plotdata', this.filters).subscribe(
      res => this.appearanceAwarePlotData = res,
      err => console.log(err)
    );
  }

}
