import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisIdentificationComponent } from './vis-identification.component';

describe('VisIdentificationComponent', () => {
  let component: VisIdentificationComponent;
  let fixture: ComponentFixture<VisIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisIdentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
