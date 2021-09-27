import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LIKERTPLOTOPTIONS } from 'src/app/models/plotdata';

@Component({
  selector: 'mh-vis-identification',
  templateUrl: './vis-identification.component.html',
  styleUrls: ['./vis-identification.component.scss']
})
export class VisIdentificationComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  identificationPersonalityPlotData: any;
  identificationIntruigingPlotData: any;
  identificationWishbelikePlotData: any;

  likertPlotOptions = LIKERTPLOTOPTIONS;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.identificationPersonalityPlotData = this.plotData.response_identification_personality;
    this.identificationIntruigingPlotData = this.plotData.response_identification_intruiging;
    this.identificationWishbelikePlotData = this.plotData.response_identification_wishbelike;
  }

}
