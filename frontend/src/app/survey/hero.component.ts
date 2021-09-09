import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Restangular } from 'ngx-restangular';
import { IHero } from '../models/hero';
import { IWork } from '../models/work';
import { YESNOUNK_OPTIONS, YESNO_OPTIONS, ROLE_OPTIONS, EDUCATION_OPTIONS, PETS_OPTIONS, AGE_OPTIONS, GENDER_OPTIONS, RELATIVES_OPTIONS, WEALTH_OPTIONS, PROBLEM_OPTIONS, SOLUTION_OPTIONS } from '../models/hero';
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
  petsOptions = PETS_OPTIONS;
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
    gender: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    country_origin: new FormControl('', [Validators.required]),
    country_live: new FormControl('', [Validators.required]),
    country_growup: new FormControl('', [Validators.required]),
    education: new FormControl('', [Validators.required]),
    profession: new FormControl('', [Validators.required]),
    hobbies: new FormControl(''),
    pets: new FormArray([]),
    pets_other_enable: new FormControl(false),
    pets_other: new FormControl([]),
    appearance: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    relatives: new FormArray([], [Validators.required]),
    wealth: new FormControl('', [Validators.required]),
    problems: new FormArray([]),
    problems_other_enable: new FormControl(false),
    problems_other: new FormControl([]),
    solutions: new FormArray([]),
    solutions_other_enable: new FormControl(false),
    solutions_other: new FormControl([]),
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
    if (event.target.checked) {
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

  formIsValid() : Boolean {
    var all_problems: string[];
    if (this.heroForm.get('problems_other_enable').value) {
      all_problems = (this.heroForm.get('problems').value).concat(this.heroForm.get('problems_other').value)
    } else {
      all_problems = this.heroForm.get('problems').value
    }
    const problems_added =  all_problems.length > 0

    var all_solutions: string[];
    if (this.heroForm.get('solutions_other_enable').value) {
      all_solutions = (this.heroForm.get('solutions').value).concat(this.heroForm.get('solutions_other').value)
    } else {
      all_solutions = this.heroForm.get('solutions').value
    }
    const solutions_added =  all_solutions.length > 0


    return this.heroForm.valid && problems_added && solutions_added
  }
  
  onSubmit(){
    this.httpError = undefined;

    var all_pets: string[];
    if (this.heroForm.get('pets_other_enable').value) {
      all_pets = (this.heroForm.get('pets').value).concat(this.heroForm.get('pets_other').value)
    } else {
      all_pets = this.heroForm.get('pets').value
    }

    var all_problems: string[];
    if (this.heroForm.get('problems_other_enable').value) {
      all_problems = (this.heroForm.get('problems').value).concat(this.heroForm.get('problems_other').value)
    } else {
      all_problems = this.heroForm.get('problems').value
    }

    var all_solutions: string[];
    if (this.heroForm.get('solutions_other_enable').value) {
      all_solutions = (this.heroForm.get('solutions').value).concat(this.heroForm.get('solutions_other').value)
    } else {
      all_solutions = this.heroForm.get('solutions').value
    }

    const heroFormData = {
      name: this.heroForm.get('name').value,
      work: this.work.id,

      role: this.heroForm.get('role').value,
      narrator: this.heroForm.get('narrator').value,
      focaliser: this.heroForm.get('focaliser').value,

      gender: this.heroForm.get('gender').value,
      age: this.heroForm.get('age').value,
      country_origin: this.heroForm.get('country_origin').value,
      country_live: this.heroForm.get('country_live').value,
      country_growup: this.heroForm.get('country_growup').value,

      education: this.heroForm.get('education').value,
      profession: this.heroForm.get('profession').value,
      hobbies: this.heroForm.get('hobbies').value,
      pets: all_pets,

      appearance: this.heroForm.get('appearance').value,
      sex: this.heroForm.get('sex').value,
      relatives: this.heroForm.get('relatives').value,
      wealth: this.heroForm.get('wealth').value,

      problems: all_problems,
      solutions: all_solutions,
    }

    this.restangular.all('heroes')
      .post(heroFormData as IHero).subscribe(
        newHero => this.addHero.emit(newHero),
        errorResponse => this.httpError = errorResponse
      );
  }


}
