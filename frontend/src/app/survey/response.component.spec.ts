import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseComponent } from './response.component';
import { SharedTestingModule } from '../shared-testing.module';

describe('ResponseComponent', () => {
    let component: ResponseComponent;
    let fixture: ComponentFixture<ResponseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ResponseComponent],
            imports: [SharedTestingModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResponseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
