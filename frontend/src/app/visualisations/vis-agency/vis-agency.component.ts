import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-agency',
  templateUrl: './vis-agency.component.html',
  styleUrls: ['./vis-agency.component.scss']
})
export class VisAgencyComponent implements OnInit, OnChanges {
  @Input() filters: any;

  agencyResponsiblePlotData: any;
  agencyIndependentPlotData: any;
  agencyHinderedPlotData: any;
  agencyEnvironmentPlotData: any;
  agencyDevelopmentPlotData: any;

  likertPlotOptions = LIKERTPLOTOPTIONS;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.http.post('/api/results/agency-responsible-plotdata', this.filters).subscribe(
      res => this.agencyResponsiblePlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/agency-independent-plotdata', this.filters).subscribe(
      res => this.agencyIndependentPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/agency-hindered-plotdata', this.filters).subscribe(
      res => this.agencyHinderedPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/agency-environment-plotdata', this.filters).subscribe(
      res => this.agencyEnvironmentPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/agency-development-plotdata', this.filters).subscribe(
      res => this.agencyDevelopmentPlotData = res,
      err => console.log(err)
    );
  }

}
