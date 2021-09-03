import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Restangular } from 'ngx-restangular';
import { IHero } from '../models/hero';
import { IWork } from '../models/work';
import { ROLE_OPTIONS, EDUCATION_OPTIONS } from '../models/hero';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mh-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  httpError: HttpErrorResponse = undefined;

  roleOptions = ROLE_OPTIONS;
  educationOptions = EDUCATION_OPTIONS;

  heroForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    country_origin: new FormControl(''),
    country_live: new FormControl(''),
    country_growup: new FormControl(''),
    education: new FormControl(''),
    profession: new FormControl(''),
  });

  @Input() 
  work: IWork;

  @Output()
  addHero = new EventEmitter<IHero>();

  constructor(private restangular: Restangular) { }

  ngOnInit(): void {
  }
  
  onSubmit(){
    this.httpError = undefined;
    const heroFormData = { ...this.heroForm.value, work: this.work.id } as IHero;
    this.restangular.all('heroes')
      .post(heroFormData).subscribe(
        newHero => this.addHero.emit(newHero),
        errorResponse => this.httpError = errorResponse
      );
  }


}
