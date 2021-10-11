import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';
import { SURVEY } from 'src/app/models/response';

@Component({
  selector: 'mh-vis-agency',
  templateUrl: './vis-agency.component.html',
  styleUrls: ['./vis-agency.component.scss']
})
export class VisAgencyComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  survey = SURVEY;
  surveyPage = 3;

  plotNames: string[] = [];
  plots = {};

  likertPlotOptions = LIKERTPLOTOPTIONS;

  constructor(private http: HttpClient) {
    this.survey.pages[this.surveyPage].elements.forEach(question => {
        if (question.type === 'rating') {
          this.plotNames = this.plotNames.concat(['response_' + question.name]);
          this.plots['response_' + question.name] = {
            title: question.title,
            data: undefined,
          };
        }
      });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
      this.plotNames.forEach( name => {
          this.plots[name].data = this.plotData[name];
        });
  }

}
