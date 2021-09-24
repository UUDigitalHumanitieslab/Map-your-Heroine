import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-gender',
  templateUrl: './vis-gender.component.html',
  styleUrls: ['./vis-gender.component.scss']
})
export class VisGenderComponent implements OnInit, OnChanges {
  @Input() filters: any;

  heroGenderPlotData: any;
  responseGenderPlotData: any;
  genderDefinesPersonalityPlotData: any;
  genderEmbracesPlotData: any;
  genderAttemptsExpectationsPlotData: any;
  genderStrugglesExpectationsPlotData: any;

  likertPlotOptions = LIKERTPLOTOPTIONS;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.http.post('/api/results/genderplotdata', this.filters).subscribe(
      res => this.heroGenderPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/responsegenderplotdata', this.filters).subscribe(
      res => this.responseGenderPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/gender-definespersonality-plotdata', this.filters).subscribe(
      res => this.genderDefinesPersonalityPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/gender-embraces-plotdata', this.filters).subscribe(
      res => this.genderEmbracesPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/gender-attempts-expectations-plotdata', this.filters).subscribe(
      res => this.genderAttemptsExpectationsPlotData = res,
      err => console.log(err)
    );

    this.http.post('/api/results/gender-struggles-expectations-plotdata', this.filters).subscribe(
      res => this.genderStrugglesExpectationsPlotData = res,
      err => console.log(err)
    );
  }

}
