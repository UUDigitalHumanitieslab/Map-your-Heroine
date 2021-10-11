import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';
import { SURVEY } from 'src/app/models/response';

@Component({
  selector: 'mh-vis-appearance',
  templateUrl: './vis-appearance.component.html',
  styleUrls: ['./vis-appearance.component.scss']
})
export class VisAppearanceComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  survey = SURVEY;
  surveyPage = 1;

  plotNames: string[] = ['hero_attractive'];
  likertPlotNames: string[] = [];
  plots = {
    hero_attractive: {
      title: 'Is the hero(ine) physically attractive within the context of the work / according to the other characters?',
      data: undefined
    }
  };

  likertPlotOptions = LIKERTPLOTOPTIONS;
  attractivePlotOptions = {
    aspectRatio: 3
  };

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
