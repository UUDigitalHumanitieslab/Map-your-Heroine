import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-personality',
  templateUrl: './vis-personality.component.html',
  styleUrls: ['./vis-personality.component.scss']
})
export class VisPersonalityComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  personalityAssertivePlotData: any;
  personalityIndependentPlotData: any;
  personalityVainPlotData: any;
  personalityConfidentPlotData: any;
  personalityWellroundedPlotData: any;
  personalityHonestPlotData: any;
  personalityLoyalPlotData: any;
  personalityCooperativePlotData: any;

  likertPlotOptions = LIKERTPLOTOPTIONS;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.personalityAssertivePlotData = this.plotData.response_personality_assertive;
    this.personalityIndependentPlotData = this.plotData.response_personality_independent;
    this.personalityVainPlotData = this.plotData.response_personality_vain;
    this.personalityConfidentPlotData = this.plotData.response_personality_confident;
    this.personalityWellroundedPlotData = this.plotData.response_personality_wellrounded;
    this.personalityHonestPlotData = this.plotData.response_personality_honest;
    this.personalityLoyalPlotData = this.plotData.response_personality_loyal;
    this.personalityCooperativePlotData = this.plotData.response_personality_cooperative;
  }

}
