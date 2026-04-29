import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkComponent } from './work.component';
import { SharedTestingModule } from '../shared-testing.module';

describe('WorkComponent', () => {
    let component: WorkComponent;
    let fixture: ComponentFixture<WorkComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkComponent],
            imports: [SharedTestingModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
