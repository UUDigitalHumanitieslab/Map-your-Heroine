import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-gender',
  templateUrl: './vis-gender.component.html',
  styleUrls: ['./vis-gender.component.scss']
})
export class VisGenderComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  heroGenderPlotData: any;
  responseGenderPlotData: any;
  genderDefinesPersonalityPlotData: any;
  genderEmbracesPlotData: any;
  genderAttemptsExpectationsPlotData: any;
  genderStrugglesExpectationsPlotData: any;

  likertPlotOptions = LIKERTPLOTOPTIONS;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.heroGenderPlotData = this.plotData.hero_gender;
    this.responseGenderPlotData = this.plotData.response_gender;
    this.genderDefinesPersonalityPlotData = this.plotData.response_gender_definespersonality;
    this.genderEmbracesPlotData = this.plotData.response_gender_embraces;
    this.genderAttemptsExpectationsPlotData = this.plotData.response_gender_attempts_expectations;
    this.genderStrugglesExpectationsPlotData = this.plotData.response_gender_struggles_expectations;
  }

}
