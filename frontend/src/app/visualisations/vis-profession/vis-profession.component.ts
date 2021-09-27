import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-profession',
  templateUrl: './vis-profession.component.html',
  styleUrls: ['./vis-profession.component.scss']
})
export class VisProfessionComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  professionPlotData: any;
  professionRelevantToPersonalityPlotData: any;
  professionSocialStatusPlotData: any;
  professionGrowthPlotData: any;
  professionDefinesLifePlotData: any;

  likertPlotOptions = LIKERTPLOTOPTIONS;
  professionPlotOptions = {
    aspectRatio: 3
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.professionPlotData = this.plotData.hero_profession;
    this.professionRelevantToPersonalityPlotData = this.plotData.response_profession_relevant_to_personality;
    this.professionSocialStatusPlotData = this.plotData.response_profession_social_status;
    this.professionGrowthPlotData = this.plotData.response_profession_growth;
    this.professionDefinesLifePlotData = this.plotData.response_profession_defines_life;
  }

}
