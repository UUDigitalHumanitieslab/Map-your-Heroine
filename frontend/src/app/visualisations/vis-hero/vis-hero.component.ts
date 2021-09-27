import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'mh-vis-hero',
  templateUrl: './vis-hero.component.html',
  styleUrls: ['./vis-hero.component.scss']
})
export class VisHeroComponent implements OnInit, OnChanges {
  @Input() filters: any;

  numberOfHeroes: number;
  genderPlotData: any;
  agePlotData: any;
  rolePlotData: any;
  narratorPlotData: any;
  focaliserPlotData: any;
  educationPlotData: any;
  wealthPlotData: any;
  professionPlotData: any;
  countryOriginPlotData: any;
  countryGrowupPlotData: any;
  countryLivePlotData: any;

  agePlotOptions = {
    legend: {
      display: false
    },
    yAxes: [{
      ticks: {min: 0}
      }]
  };

  smallPlotOptions = {
    aspectRatio: 1.5
  };

  countryPlotOptions = {
    aspectRatio: 1
  };

  widePlotOptions = {
    aspectRatio: 3
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.http.post('/api/results/n-heroes', this.filters).subscribe(
      res => this.numberOfHeroes = res as number,
      err => console.log(err)
    );

    this.http.post('/api/results/genderplotdata', this.filters).subscribe(
      res => this.genderPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/ageplotdata', this.filters).subscribe(
      res => this.agePlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/roleplotdata', this.filters).subscribe(
      res => this.rolePlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/narratorplotdata', this.filters).subscribe(
      res => this.narratorPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/focaliserplotdata', this.filters).subscribe(
      res => this.focaliserPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/education-plotdata', this.filters).subscribe(
      res => this.educationPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/wealth-plotdata', this.filters).subscribe(
      res => this.wealthPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/professionplotdata', this.filters).subscribe(
      res => this.professionPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/country-origin-plotdata', this.filters).subscribe(
      res => this.countryOriginPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/country-growup-plotdata', this.filters).subscribe(
      res => this. countryGrowupPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/country-live-plotdata', this.filters).subscribe(
      res => this.countryLivePlotData = res,
      err => console.log(err)
    );
  }

}
