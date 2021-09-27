import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import * as Survey from 'survey-angular';
import { SURVEY } from '../models/survey';

Survey.StylesManager.applyTheme("default");

@Component({
  selector: 'mh-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})

export class ResponseComponent implements OnInit  {

  surveyJSON = SURVEY;

  @Output()
  completeResponse = new EventEmitter<any>()

  constructor(private restangular: Restangular) {}

  ngOnInit() {
    var survey = new Survey.Model(this.surveyJSON);
    survey.onComplete.add(this.sendDataToServer);
    Survey.SurveyNG.render("surveyElement", {model: survey});
  }

  sendDataToServer = (survey,completed) => {
    this.completeResponse.emit(survey.data);
  }
}