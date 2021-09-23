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

  agePlotOptions = {
    legend: {
      display: false
    }
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
  }

}
