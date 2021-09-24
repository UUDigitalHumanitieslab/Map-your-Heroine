import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

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

  likertPlotOptions = LIKERTPLOTOPTIONS;

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
