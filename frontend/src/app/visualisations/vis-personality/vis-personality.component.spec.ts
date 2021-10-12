import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisPersonalityComponent } from './vis-personality.component';

describe('VisPersonalityComponent', () => {
  let component: VisPersonalityComponent;
  let fixture: ComponentFixture<VisPersonalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisPersonalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisPersonalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
