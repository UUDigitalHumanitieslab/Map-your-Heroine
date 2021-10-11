import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';
import { SURVEY } from 'src/app/models/response';

@Component({
  selector: 'mh-vis-personality',
  templateUrl: './vis-personality.component.html',
  styleUrls: ['./vis-personality.component.scss']
})
export class VisPersonalityComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  survey = SURVEY;
  surveyPage = 5;

  plotNames: string[] = [];
  likertPlotNames: string[] = [];
  plots = {};

  likertPlotOptions = LIKERTPLOTOPTIONS;

  constructor(private http: HttpClient) {
    this.survey.pages[this.surveyPage].elements.forEach(question => {
        if (question.type === 'rating') {
            this.plotNames = this.plotNames.concat(['response_' + question.name]);
            this.likertPlotNames = this.likertPlotNames.concat(['response_' + question.name]);
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
