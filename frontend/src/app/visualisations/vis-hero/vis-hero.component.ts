import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'mh-vis-hero',
  templateUrl: './vis-hero.component.html',
  styleUrls: ['./vis-hero.component.scss']
})
export class VisHeroComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  numberOfHeroes: number;
  genderPlotData: any;
  agePlotData: any;
  rolePlotData: any;
  narratorPlotData: any;
  focaliserPlotData: any;
  educationPlotData: any;
  wealthPlotData: any;
  professionPlotData: any;
  countryOriginPlotData: any;
  countryGrowupPlotData: any;
  countryLivePlotData: any;

  agePlotOptions = {
    legend: {
      display: false
    },
    yAxes: [{
      ticks: {min: 0}
      }]
  };

  smallPlotOptions = {
    aspectRatio: 1.5
  };

  countryPlotOptions = {
    aspectRatio: 1
  };

  widePlotOptions = {
    aspectRatio: 3
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.numberOfHeroes = this.plotData.n_heroes;
    this.genderPlotData = this.plotData.hero_gender;
    this.agePlotData = this.plotData.hero_age;
    this.rolePlotData = this.plotData.hero_role;
    this.narratorPlotData = this.plotData.hero_narrator;
    this.focaliserPlotData = this.plotData.hero_focaliser;
    this.educationPlotData = this.plotData.hero_education;
    this.wealthPlotData = this.plotData.hero_wealth;
    this.professionPlotData = this.plotData.hero_profession;
    this.countryOriginPlotData = this.plotData.hero_country_origin;
    this.countryGrowupPlotData = this.plotData.hero_country_growup;
    this.countryLivePlotData = this.plotData.hero_country_live;
  }

}
