import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-appearance',
  templateUrl: './vis-appearance.component.html',
  styleUrls: ['./vis-appearance.component.scss']
})
export class VisAppearanceComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  attractivePlotData: any;
  appearanceBeautifulPlotData: any;
  appearanceWishlookedlikePlotData: any;
  appearanceInfluencefeelingsPlotData: any;
  appearanceImpactPlotData: any;
  appearanceAwarePlotData: any;

  likertPlotOptions = LIKERTPLOTOPTIONS;
  attractivePlotOptions = {
    aspectRatio: 3
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.attractivePlotData = this.plotData.hero_attractive;
    this.appearanceBeautifulPlotData = this.plotData.response_appearance_beautiful;
    this.appearanceWishlookedlikePlotData = this.plotData.response_appearance_wishlookedlike;
    this.appearanceInfluencefeelingsPlotData = this.plotData.response_appearance_influencefeelings;
    this.appearanceImpactPlotData = this.plotData.response_appearance_impact;
    this.appearanceAwarePlotData = this.plotData.response_appearance_aware;
  }

}
