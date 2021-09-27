import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'mh-vis-work',
  templateUrl: './vis-work.component.html',
  styleUrls: ['./vis-work.component.scss']
})
export class VisWorkComponent implements OnInit, OnChanges {
  @Input() filters: any;

  mediumPlotData: any;
  pubcountryPlotData: any;
  pubyearPlotData: any;
  environmentPlotData: any;
  adaptationPlotData: any;

  pubyearPlotOptions = {
    legend: {
      display: false
    }
  };

  numberOfWorks: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.http.post('/api/results/n-works', this.filters).subscribe(
      res => this.numberOfWorks = res as number,
      err => console.log(err)
    );

    this.http.post('/api/results/mediumplotdata', this.filters).subscribe(
      res => this.mediumPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/pubcountryplotdata', this.filters).subscribe(
      res => this.pubcountryPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/pubyearplotdata', this.filters).subscribe(
      res => this.pubyearPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/environmentplotdata', this.filters).subscribe(
      res => this.environmentPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/adaptationplotdata', this.filters).subscribe(
      res => this.adaptationPlotData = res,
      err => console.log(err)
    );
  }

}
