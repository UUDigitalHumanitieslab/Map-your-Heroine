import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { SharedTestingModule } from '../shared-testing.module';

describe('ResultComponent', () => {
    let component: ResultComponent;
    let fixture: ComponentFixture<ResultComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ResultComponent],
            imports: [SharedTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultComponent);
        component = fixture.componentInstance;
        component.work = {
            title: 'Test',
            medium: 'novel',
            author: 'Tester',
            pub_year: 1900,
            pub_country: '',
            is_source: true,
            environment: '',
            heroes: [],
        };
        component.hero = {
            name: 'Test',
            role: '',
            narrator: false,
            focaliser: false,
            work: '',
            gender: '',
            country_origin: '',
            country_growup: '',
            country_live: '',
            education: '',
            pets: [],
            profession: '',
            hobbies: [],
            sex: false,
            relatives: [],
            problems: [],
            solutions: [],
        };
        component.response = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
