import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAppearanceComponent } from './vis-appearance.component';
import { SharedTestingModule } from 'src/app/shared-testing.module';

describe('VisAppearanceComponent', () => {
    let component: VisAppearanceComponent;
    let fixture: ComponentFixture<VisAppearanceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VisAppearanceComponent],
            imports:  [SharedTestingModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VisAppearanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
