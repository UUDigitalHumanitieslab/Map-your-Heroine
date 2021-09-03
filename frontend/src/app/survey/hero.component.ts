import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Restangular } from 'ngx-restangular';
import { IHero } from '../models/hero';
import { IWork } from '../models/work';
import { YESNOUNK_OPTIONS, YESNO_OPTIONS, ROLE_OPTIONS, EDUCATION_OPTIONS, AGE_OPTIONS, GENDER_OPTIONS, RELATIVES_OPTIONS, WEALTH_OPTIONS, PROBLEM_OPTIONS, SOLUTION_OPTIONS } from '../models/hero';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mh-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  httpError: HttpErrorResponse = undefined;

  yesnounkOptions = YESNOUNK_OPTIONS;
  yesnoOptions = YESNO_OPTIONS;
  roleOptions = ROLE_OPTIONS;
  educationOptions = EDUCATION_OPTIONS;
  ageOptions = AGE_OPTIONS;
  genderOptions = GENDER_OPTIONS;
  relativesOptions = RELATIVES_OPTIONS;
  wealthOptions = WEALTH_OPTIONS;
  problemOptions = PROBLEM_OPTIONS;
  solutionOptions = SOLUTION_OPTIONS;

  heroForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    narrator: new FormControl('', [Validators.required]),
    focaliser: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
    age: new FormControl(''),
    country_origin: new FormControl(''),
    country_live: new FormControl(''),
    country_growup: new FormControl(''),
    education: new FormControl(''),
    profession: new FormControl(''),
    hobbies: new FormControl(''),
    pets: new FormControl(''),
    appearance: new FormControl(''),
    sex: new FormControl(''),
    relatives: new FormControl(''),
    wealth: new FormControl(''),
    problems: new FormControl(''),
    solutions: new FormControl(''),
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
    alert(JSON.stringify({ ...this.heroForm.value, work: this.work.id }, null, 2));
    const heroFormData = { ...this.heroForm.value, work: this.work.id } as IHero;
    this.restangular.all('heroes')
      .post(heroFormData).subscribe(
        newHero => this.addHero.emit(newHero),
        errorResponse => this.httpError = errorResponse
      );
  }


}
