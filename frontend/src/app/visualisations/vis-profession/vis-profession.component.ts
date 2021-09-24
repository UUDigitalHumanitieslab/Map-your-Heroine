import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-profession',
  templateUrl: './vis-profession.component.html',
  styleUrls: ['./vis-profession.component.scss']
})
export class VisProfessionComponent implements OnInit, OnChanges {
  @Input() filters: any;

  professionPlotData: any;
  professionRelevantToPersonalityPlotData: any;
  professionSocialStatusPlotData: any;
  professionGrowthPlotData: any;
  professionDefinesLifePlotData: any;

  likertPlotOptions = LIKERTPLOTOPTIONS;
  professionPlotOptions = {
    aspectRatio: 3
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.http.post('/api/results/professionplotdata', this.filters).subscribe(
      res => this.professionPlotData = res,
      err => console.log(err)
    );
    this.http.post('/api/results/profession-relevant-to-personality-plotdata', this.filters).subscribe(
      res => this.professionRelevantToPersonalityPlotData = res,
      err => console.log(err)
    );
    this.http.post('/api/results/profession-social-status-plotdata', this.filters).subscribe(
      res => this.professionSocialStatusPlotData = res,
      err => console.log(err)
    );
    this.http.post('/api/results/profession-growth-plotdata', this.filters).subscribe(
      res => this.professionGrowthPlotData = res,
      err => console.log(err)
    );
    this.http.post('/api/results/profession-defines-life-plotdata', this.filters).subscribe(
      res => this.professionDefinesLifePlotData = res,
      err => console.log(err)
    );
  }

}
