import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-agency',
  templateUrl: './vis-agency.component.html',
  styleUrls: ['./vis-agency.component.scss']
})
export class VisAgencyComponent implements OnInit, OnChanges {
  @Input() plotData: any;

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
    this.agencyResponsiblePlotData = this.plotData.response_agency_responsible;
    this.agencyIndependentPlotData = this.plotData.response_agency_independent;
    this.agencyHinderedPlotData = this.plotData.response_agency_hindered;
    this.agencyEnvironmentPlotData = this.plotData.response_agency_environment;
    this.agencyDevelopmentPlotData = this.plotData.response_agency_development;
  }

}
