import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Restangular } from 'ngx-restangular';
import { IHero } from '../models/hero';
import { IWork } from '../models/work';
import { YESNOUNK_OPTIONS, YESNO_OPTIONS, ROLE_OPTIONS,
  EDUCATION_OPTIONS, PETS_OPTIONS, AGE_OPTIONS, GENDER_OPTIONS,
  RELATIVES_OPTIONS, WEALTH_OPTIONS, PROBLEM_OPTIONS, SOLUTION_OPTIONS } from '../models/hero';
import { HttpErrorResponse } from '@angular/common/http';
import { COUNTRIES } from '../models/countries';

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
  countryOptions = COUNTRIES.concat([{name: 'Other', code: 'OTHER'}, {name: 'Imaginary', code: 'IMAGINARY'}, {name: 'Unknown', code: 'UNKNOWN'}]);

  filteredCountriesOrigin = [];
  filteredCountriesLive = [];
  filteredCountriesGrowup = [];

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
    no_hobbies: new FormControl(false),
    pets: new FormArray([]),
    pets_other_enable: new FormControl(false),
    pets_other: new FormControl({value: [], disabled: true}),
    appearance: new FormControl(''),
    sex: new FormControl('', [Validators.required]),
    relatives: new FormArray([], [Validators.required]),
    wealth: new FormControl('', [Validators.required]),
    problems: new FormArray([]),
    problems_other_enable: new FormControl(false),
    problems_other: new FormControl({value: [], disabled: true}),
    solutions: new FormArray([]),
    solutions_other_enable: new FormControl(false),
    solutions_other: new FormControl({value: [], disabled: true}),
  });

  @Input() 
  work: IWork;

  @Output()
  addHero = new EventEmitter<IHero>();

  constructor(private restangular: Restangular) { }

  ngOnInit(): void {
  }

  onCheckboxChange(name, value, event) {
    const checkArray: FormArray = this.heroForm.get(name) as FormArray;
    if (event.target.checked) {
      checkArray.push(new FormControl(value));
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

  onNoHobbiesChange(event): void {
    const hobbiesControl = this.heroForm.get('hobbies');
    const noHobbiesControl = this.heroForm.get('no_hobbies')
    if (event.target.checked) {
      hobbiesControl.disable();
    } else {
      hobbiesControl.enable();
    }
    noHobbiesControl.setValue(event.target.checked);
  }

  filteredCountries(event) {
    let filtered : any[] = [];
    const query = event.query;

    for (const country of this.countryOptions) {
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            filtered.push(country);
        }
    }
    return filtered;
  }

  filterCountryOrigin(event) {
    this.filteredCountriesOrigin = this.filteredCountries(event);
  }

  filterCountryLive(event) {
    this.filteredCountriesLive = this.filteredCountries(event);
  }

  filterCountryGrowup(event) {
    this.filteredCountriesGrowup = this.filteredCountries(event);
  }

  get allHobbies(): string[] {
    if (this.heroForm.get('no_hobbies').value) {
      return [];
    } else {
      return this.heroForm.get('hobbies').value;
    }
  }

  get allPets(): string[] {
    if (this.heroForm.get('pets_other_enable').value) {
      return (this.heroForm.get('pets').value).concat(this.heroForm.get('pets_other').value);
    } else {
      return this.heroForm.get('pets').value;
    }
  }

  get allProblems(): string[] {
    if (this.heroForm.get('problems_other_enable').value) {
      return (this.heroForm.get('problems').value).concat(this.heroForm.get('problems_other').value);
    } else {
      return this.heroForm.get('problems').value;
    }
  }

  get allSolutions(): string[] {
    if (this.heroForm.get('solutions_other_enable').value) {
      return (this.heroForm.get('solutions').value).concat(this.heroForm.get('solutions_other').value);
    } else {
      return this.heroForm.get('solutions').value;
    }
  }

  formIsValid(): boolean {
    const hobbiesAdded = this.heroForm.get('no_hobbies').value || (this.heroForm.get('hobbies').value.length > 0);
    const petsAdded =  this.allPets.length > 0;
    const problemsAdded =  this.allProblems.length > 0;
    const solutionsAdded =  this.allSolutions.length > 0;
    const appearanceDirty = this.heroForm.get('appearance').dirty;

    return this.heroForm.valid && hobbiesAdded && petsAdded && problemsAdded && solutionsAdded && appearanceDirty;
  }

  onSubmit(){
    this.httpError = undefined;

    const heroFormData = {
      name: this.heroForm.get('name').value,
      work: this.work.id,

      role: this.heroForm.get('role').value,
      narrator: this.heroForm.get('narrator').value,
      focaliser: this.heroForm.get('focaliser').value,

      gender: this.heroForm.get('gender').value,
      age: this.heroForm.get('age').value,
      country_origin: this.heroForm.get('country_origin').value.name,
      country_live: this.heroForm.get('country_live').value.name,
      country_growup: this.heroForm.get('country_growup').value.name,

      education: this.heroForm.get('education').value,
      profession: this.heroForm.get('profession').value,
      hobbies: this.allHobbies,
      pets: this.allPets,

      appearance: this.heroForm.get('appearance').value,
      sex: this.heroForm.get('sex').value,
      relatives: this.heroForm.get('relatives').value,
      wealth: this.heroForm.get('wealth').value,

      problems: this.allProblems,
      solutions: this.allSolutions,
    };

    console.log(heroFormData);

    this.restangular.all('heroes')
      .post(heroFormData as IHero).subscribe(
        newHero => this.addHero.emit(newHero),
        errorResponse => {
          this.httpError = errorResponse;
          console.log(this.httpError.message);
        }
      );
  }


}
