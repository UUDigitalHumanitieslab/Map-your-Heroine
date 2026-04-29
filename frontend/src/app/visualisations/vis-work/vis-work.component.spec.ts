import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisWorkComponent } from './vis-work.component';
import { SharedTestingModule } from 'src/app/shared-testing.module';

describe('VisWorkComponent', () => {
    let component: VisWorkComponent;
    let fixture: ComponentFixture<VisWorkComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VisWorkComponent],
            imports: [SharedTestingModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VisWorkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
