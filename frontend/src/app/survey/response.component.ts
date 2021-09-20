import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import * as Survey from 'survey-angular';
import * as surveyJSON from '../../assets/response-survey.json';

Survey.StylesManager.applyTheme("default");

@Component({
  selector: 'mh-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})

export class ResponseComponent implements OnInit  {
  @Output()
  completeResponse = new EventEmitter<any>()

  constructor(private restangular: Restangular) {}

  ngOnInit() {
    var survey = new Survey.Model(surveyJSON);
    survey.onComplete.add(this.sendDataToServer);
    Survey.SurveyNG.render("surveyElement", {model:survey});
  }

  sendDataToServer = (survey,completed) => {  
    this.completeResponse.emit(survey.data)
  }
}