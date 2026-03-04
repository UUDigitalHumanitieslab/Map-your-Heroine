import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { SURVEY } from '../models/response';
import { Model } from 'survey-core';

@Component({
    selector: 'mh-response',
    templateUrl: './response.component.html',
    styleUrls: ['./response.component.scss'],
})

export class ResponseComponent implements OnInit {

    surveyJSON = SURVEY;
    survey: Model;

    @Output()
    completeResponse = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        this.survey = new Model(this.surveyJSON);
        this.survey.onComplete.add(this.sendDataToServer);
    }

    sendDataToServer = (survey, completed) => {
        this.completeResponse.emit(survey.data);
    }
}
