import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisHeroComponent } from './vis-hero.component';
import { SharedTestingModule } from 'src/app/shared-testing.module';

describe('VisHeroComponent', () => {
    let component: VisHeroComponent;
    let fixture: ComponentFixture<VisHeroComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VisHeroComponent],
            imports: [SharedTestingModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VisHeroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
