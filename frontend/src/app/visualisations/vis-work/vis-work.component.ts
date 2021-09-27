import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'mh-vis-work',
  templateUrl: './vis-work.component.html',
  styleUrls: ['./vis-work.component.scss']
})
export class VisWorkComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  mediumPlotData: any;
  pubcountryPlotData: any;
  pubyearPlotData: any;
  environmentPlotData: any;
  adaptationPlotData: any;

  pubyearPlotOptions = {
    legend: {
      display: false
    }
  };

  numberOfWorks: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.plotData) {
      this.numberOfWorks = this.plotData.n_works;
      this.mediumPlotData = this.plotData.work_medium;
      this.pubcountryPlotData = this.plotData.work_pub_country;
      this.pubyearPlotData = this.plotData.work_pub_year;
      this.environmentPlotData = this.plotData.work_environment;
      this.adaptationPlotData = this.plotData.work_adaptation;
    }
  }

}
