import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'mh-vis-identification',
  templateUrl: './vis-identification.component.html',
  styleUrls: ['./vis-identification.component.scss']
})
export class VisIdentificationComponent implements OnInit, OnChanges {
  @Input() filters: any;

  identificationPersonalityPlotData: any;
  identificationIntruigingPlotData: any;
  identificationWishbelikePlotData: any;

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
    this.http.post('/api/results/identification-personality-plotdata', this.filters).subscribe(
      res => this.identificationPersonalityPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/identification-intruiging-plotdata', this.filters).subscribe(
      res => this.identificationIntruigingPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/identification-wishbelike-plotdata', this.filters).subscribe(
      res => this.identificationWishbelikePlotData = res,
      err => console.log(err)
    );
  }

}
