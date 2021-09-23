import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'mh-vis-gender',
  templateUrl: './vis-gender.component.html',
  styleUrls: ['./vis-gender.component.scss']
})
export class VisGenderComponent implements OnInit, OnChanges {
  @Input() filters: any;

  heroGenderPlotData: any;
  responseGenderPlotData: any;
  genderDefinesPersonalityPlotData: any;

  likertPlotOptions = {
    aspectRatio: 8,
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.http.post('/api/results/genderplotdata', this.filters).subscribe(
      res => this.heroGenderPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/responsegenderplotdata', this.filters).subscribe(
      res => this.responseGenderPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/gender-defines-personality-plotdata', this.filters).subscribe(
      res => this.genderDefinesPersonalityPlotData = res,
      err => console.log(err)
    );
  }

}
