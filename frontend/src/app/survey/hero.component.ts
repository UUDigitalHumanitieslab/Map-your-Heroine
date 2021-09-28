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
import { Subscription } from 'rxjs';

@Component({
  selector: 'mh-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  subscriptions$: Subscription[] = [];
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
    hobbies: new FormControl('', [Validators.required]),
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
    this.subscriptions$.push(
      this.heroForm.controls.problems_other_enable.valueChanges
        .subscribe(change => this.onOtherCheckboxChange(change, 'problems_other'))
    );
    this.subscriptions$.push(
      this.heroForm.controls.solutions_other_enable.valueChanges
        .subscribe(change => this.onOtherCheckboxChange(change, 'solutions_other'))
    );
    this.subscriptions$.push(
      this.heroForm.controls.pets_other_enable.valueChanges
        .subscribe(change => this.onOtherCheckboxChange(change, 'pets_other'))
    );
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

  onOtherCheckboxChange(change: boolean, field: string): void {
    const control = this.heroForm.get(field);
    if (change) {
      control.enable();
    } else {
      control.disable();
    }
  }

  onNoHobbiesChange(event): void {
    const hobbiesControl = this.heroForm.controls.hobbies;
    const noHobbiesControl = this.heroForm.controls.no_hobbies;
    if (event.target.checked) {
      hobbiesControl.clearValidators();
      hobbiesControl.disable();
    } else {
      hobbiesControl.enable();
      hobbiesControl.setValidators([Validators.required]);
    }
    hobbiesControl.updateValueAndValidity();
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
    if (this.heroForm.controls.no_hobbies.value) {
      return [];
    } else {
      return this.heroForm.controls.hobbies.value;
    }
  }

  get allPets(): string[] {
    if (this.heroForm.get('pets_other_enable').value) {
      return (this.heroForm.controls.pets.value).concat(this.heroForm.controls.pets_other.value);
    } else {
      return this.heroForm.controls.pets.value;
    }
  }

  get allProblems(): string[] {
    if (this.heroForm.get('problems_other_enable').value) {
      return (this.heroForm.controls.problems.value).concat(this.heroForm.controls.problems_other.value);
    } else {
      return this.heroForm.controls.problems.value;
    }
  }

  get allSolutions(): string[] {
    if (this.heroForm.get('solutions_other_enable').value) {
      return (this.heroForm.controls.solutions.value).concat(this.heroForm.controls.solutions_other.value);
    } else {
      return this.heroForm.controls.solutions.value;
    }
  }

  formIsValid(): boolean {
    // const hobbiesAdded = this.heroForm.get('no_hobbies').value || (this.heroForm.get('hobbies').value.length > 0);
    const petsAdded =  this.allPets.length > 0;
    const problemsAdded =  this.allProblems.length > 0;
    const solutionsAdded =  this.allSolutions.length > 0;
    const appearanceDirty = this.heroForm.get('appearance').dirty;

    return this.heroForm.valid && petsAdded && problemsAdded && solutionsAdded && appearanceDirty;
  }

  onSubmit(){
    this.httpError = undefined;

    const heroFormData = {
      name: this.heroForm.controls.name.value,
      work: this.work.id,

      role: this.heroForm.controls.role.value,
      narrator: this.heroForm.controls.narrator.value,
      focaliser: this.heroForm.controls.focaliser.value,

      gender: this.heroForm.controls.gender.value,
      age: this.heroForm.controls.age.value,
      country_origin: this.heroForm.controls.country_origin.value.name,
      country_live: this.heroForm.controls.country_live.value.name,
      country_growup: this.heroForm.controls.country_growup.value.name,

      education: this.heroForm.controls.education.value,
      profession: this.heroForm.controls.profession.value,
      hobbies: this.allHobbies,
      pets: this.allPets,

      appearance: this.heroForm.controls.appearance.value,
      sex: this.heroForm.controls.sex.value,
      relatives: this.heroForm.controls.relatives.value,
      wealth: this.heroForm.controls.wealth.value,

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
