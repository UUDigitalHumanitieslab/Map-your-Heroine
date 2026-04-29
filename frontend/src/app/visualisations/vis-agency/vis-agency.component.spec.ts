import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAgencyComponent } from './vis-agency.component';
import { SharedTestingModule } from 'src/app/shared-testing.module';

describe('VisAgencyComponent', () => {
    let component: VisAgencyComponent;
    let fixture: ComponentFixture<VisAgencyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VisAgencyComponent],
            imports: [SharedTestingModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VisAgencyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
