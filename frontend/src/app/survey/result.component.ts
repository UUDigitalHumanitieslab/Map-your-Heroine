import { Component, Input, OnInit } from '@angular/core';
import { faArrowLeft, faChartBar, faChartPie, faUndo } from '@fortawesome/free-solid-svg-icons';
import { isBoolean } from 'lodash';
import { EDUCATION_OPTIONS, GENDER_OPTIONS, IHero, PROFESSION_OPTIONS, RELATIVES_OPTIONS, ROLE_OPTIONS, WEALTH_OPTIONS } from '../models/hero';
import { IResponse, SURVEY } from '../models/response';
import { IWork } from '../models/work';

@Component({
    selector: 'mh-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
    @Input() work: IWork;
    @Input() hero: IHero;
    @Input() response: any;
    @Input() createdWork: boolean;
    @Input() createdHero: boolean;
    @Input() adaptedWork: IWork;

    survey = SURVEY;

    choicesFormatting = {
        gender: GENDER_OPTIONS,
        role: ROLE_OPTIONS,
        education: EDUCATION_OPTIONS,
        profession: PROFESSION_OPTIONS,
        wealth: WEALTH_OPTIONS,
        relatives: RELATIVES_OPTIONS,
    };

    faUndo = faUndo;
    faChart = faChartBar;

    constructor() { }

    ngOnInit(): void {
    }

    formatResponse(response, type?) {
        if (type === 'radiogroup' && typeof(response) === 'boolean') {
            return response ? 'Yes' : 'No';
        }

        if (type === 'boolean') {
            if (response === undefined) {
                return 'Unknown';
            }
            return response ? 'Yes' : 'No';
        }

        if (type === 'list') {
            return (response as string[]).join(', ');
        }

        if (type === 'relatives') {
            return response
                .map(item => this.choicesFormatting.relatives.find(option => option.value === item).label)
                .join(', ');
        }

        if (type in this.choicesFormatting) {
            return this.choicesFormatting[type].find(option => option.value === response).label;
        }

        if (type === 'adaptation of') {
            if (response) {
                const work = response as IWork;
                return `${work.title} - ${work.medium} (${work.pub_year})`;
            } else { return 'Not an adaptation'; }
        }

        return response;
    }

    get workFields() {
        return [
            {
                label: 'Title',
                get_value: work => work.title,
            }, {
                label: 'Author(s)',
                get_value: work => work.author,
            }, {
                label: 'Medium',
                get_value: work => work.medium,
            }, {
                label: 'Year of (first) publication',
                get_value: work => work.pub_year,
            }, {
                label: 'Country of publication',
                get_value: work => work.pub_country
            }, {
                label: 'Is this work an adaptation?',
                get_value: work => this.formatResponse(!work.is_source, 'boolean'),
            }, {
                label: 'Adaptation of (if any)',
                get_value: work => this.formatResponse(this.adaptedWork, 'adaptation of'),
            }
        ];
    }

    get heroFields() {

        return [
            {
                label: 'Name',
                get_value: hero => hero.name,
            }, {
                label: 'What is the role of the hero(ine)?',
                get_value: hero => this.formatResponse(hero.role, 'role'),
            }, {
                label: 'Is the hero (ine) the narrator?',
                get_value: hero => hero.narrator ? 'Yes' : 'No',
            }, {
                label: 'Is the hero(ine) the focaliser?',
                get_value: hero => hero.focaliser ? 'Yes' : 'No',
            }, {
                label: 'Gender',
                get_value: hero => this.formatResponse(hero.gender, 'gender'),
            }, {
                label: 'Age',
                get_value: hero => hero.age,
            }, {
                label: 'Country where the hero(ine) was born',
                get_value: hero => hero.country_origin,
            }, {
                label: 'Country where the hero(ine) grew up',
                get_value: hero => hero.country_growup,
            }, {
                label: 'Country where the hero(ine) lives',
                get_value: hero => hero.country_live,
            }, {
                label: 'Level of education',
                get_value: hero => this.formatResponse(hero.education, 'education'),
            }, {
                label: 'Field of profession',
                get_value: hero => this.formatResponse(hero.profession, 'profession'),
            }, {
                label: 'Hobbies',
                get_value: hero => this.formatResponse(hero.hobbies, 'list'),
            }, {
                label: 'Pets',
                get_value: hero => this.formatResponse(hero.pets, 'list'),
            }, {
                label: 'Is the hero(ine) considered attractive within the work?',
                get_value: hero => this.formatResponse(hero.appearance, 'boolean'),
            }, {
                label: 'Are the hero(ine)\'s sexual relations described?',
                get_value: hero => this.formatResponse(hero.sex, 'boolean'),
            }, {
                label: 'Relatives',
                get_value: hero => this.formatResponse(hero.relatives, 'relatives'),
            }, {
                label: 'Level of wealth',
                get_value: hero => this.formatResponse(hero.wealth, 'wealth'),
            }, {
                label: 'What kind of problems does the hero(ine) encounter?',
                get_value: hero => this.formatResponse(hero.problems, 'list'),
            }, {
                label: 'How does the hero(ine) overcome problems?',
                get_value: hero => this.formatResponse(hero.solutions, 'list'),
            }
        ];
    }

    get responseFields() {
        return this.survey.pages.map(page => {
            const title = page.title;
            const questions = [];

            page.elements.forEach(question => {
                const label = question.title;
                const get_value = response => this.formatResponse(response[question.name], question.type);
                questions.push({label, get_value });
            });

            return {title, questions};
        });
    }

    // example response for development
    get testResponse() {
        return {
            agency_development: 6,
            agency_environment: 7,
            agency_hindered: 3,
            agency_independent: 4,
            agency_responsible: 2,
            appearance_aware: 7,
            appearance_beautiful: 3,
            appearance_enable: true,
            appearance_impact: 4,
            appearance_influencefeelings: 5,
            appearance_wishlookedlike: 5,
            gender_attempts_expectations: 6,
            gender_definespersonality: 4,
            gender_embraces: 5,
            gender_struggles_expectations: 6,
            identification_intruiging: 5,
            identification_personality: 2,
            identification_wishbelike: 4,
            participant_age: "26-35",
            participant_gender: "Female",
            participant_nationality: "The Netherlands",
            personality_assertive: 3,
            personality_confident: 4,
            personality_cooperative: 6,
            personality_honest: 2,
            personality_independent: 5,
            personality_loyal: 7,
            personality_vain: 4,
            personality_wellrounded: 6,
            profession_enable: false,
        };
    }
}
