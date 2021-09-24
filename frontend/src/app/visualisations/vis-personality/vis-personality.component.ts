import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-personality',
  templateUrl: './vis-personality.component.html',
  styleUrls: ['./vis-personality.component.scss']
})
export class VisPersonalityComponent implements OnInit, OnChanges {
  @Input() filters: any;

  personalityAssertivePlotData: any;
  personalityIndependentPlotData: any;
  personalityVainPlotData: any;
  personalityConfidentPlotData: any;
  personalityWellroundedPlotData: any;
  personalityHonestPlotData: any;
  personalityLoyalPlotData: any;
  personalityCooperativePlotData: any;

  likertPlotOptions = LIKERTPLOTOPTIONS;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.http.post('/api/results/personality-assertive-plotdata', this.filters).subscribe(
      res => this.personalityAssertivePlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/personality-independent-plotdata', this.filters).subscribe(
      res => this.personalityIndependentPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/personality-vain-plotdata', this.filters).subscribe(
      res => this.personalityVainPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/personality-confident-plotdata', this.filters).subscribe(
      res => this.personalityConfidentPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/personality-wellrounded-plotdata', this.filters).subscribe(
      res => this.personalityWellroundedPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/personality-honest-plotdata', this.filters).subscribe(
      res => this.personalityHonestPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/personality-loyal-plotdata', this.filters).subscribe(
      res => this.personalityLoyalPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/personality-cooperative-plotdata', this.filters).subscribe(
      res => this.personalityCooperativePlotData = res,
      err => console.log(err)
    );
  }

}
