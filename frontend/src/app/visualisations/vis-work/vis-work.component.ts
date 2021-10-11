import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'mh-vis-work',
  templateUrl: './vis-work.component.html',
  styleUrls: ['./vis-work.component.scss']
})
export class VisWorkComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  plotNames = ['work_medium', 'work_pub_country', 'work_pub_year', 'work_environment', 'work_adaptation'];
  plots = {
    work_medium: {
      title: 'Media',
      data: undefined
    },
    work_pub_country: {
      title: 'Country of publication',
      data: undefined
    },
    work_pub_year: {
      title: 'Year of publication',
      data: undefined,
    },
    work_adaptation: {
      title: 'Source works and adaptations',
      data: undefined
    },
    work_environment: {
      title: 'Where does the action take place?',
      data: undefined
    }
  };

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
    this.numberOfWorks = this.plotData.n_works;

    this.plotNames.forEach( name => {
      this.plots[name].data = this.plotData[name];
    });
  }

}
