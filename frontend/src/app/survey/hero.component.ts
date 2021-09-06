import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
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
    role: new FormControl('', ),
    narrator: new FormControl('',),
    focaliser: new FormControl('',),
    gender: new FormControl(''),
    age: new FormControl([]),
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
    problems: new FormArray([]),
    problems_other_enable: new FormControl(false),
    problems_other: new FormControl([]),
    solutions: new FormControl(''),
  });

  @Input() 
  work: IWork;

  @Output()
  addHero = new EventEmitter<IHero>();

  constructor(private restangular: Restangular) { }

  ngOnInit(): void {
  }

  onCheckboxChange(name, value, event) {
    const checkArray: FormArray = this.heroForm.get(name) as FormArray
    if (event.checked) {
      checkArray.push(new FormControl(value))
    }
    else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  
  onSubmit(){
    this.httpError = undefined;

    var all_problems: string[];
    if (this.heroForm.get('problems_other_enable').value) {
      all_problems = (this.heroForm.get('problems').value).concat(this.heroForm.get('problems_other').value)
    } else {
      all_problems = this.heroForm.get('problems').value
    }

    const heroFormData = {
      name: this.heroForm.get('name').value,
      work: this.work.id,

      role: this.heroForm.get('role').value,
      narrator: this.heroForm.get('narrator').value,
      focaliser: this.heroForm.get('focaliser').value,

      gender: this.heroForm.get('gender').value,

      problems: all_problems,
    }

    alert(JSON.stringify(heroFormData))

    this.restangular.all('heroes')
      .post(heroFormData).subscribe(
        newHero => this.addHero.emit(newHero),
        errorResponse => this.httpError = errorResponse
      );
  }


}
