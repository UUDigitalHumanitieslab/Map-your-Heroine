import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisGenderComponent } from './vis-gender.component';
import { SharedTestingModule } from 'src/app/shared-testing.module';

describe('VisGenderComponent', () => {
    let component: VisGenderComponent;
    let fixture: ComponentFixture<VisGenderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VisGenderComponent],
            imports: [SharedTestingModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VisGenderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
