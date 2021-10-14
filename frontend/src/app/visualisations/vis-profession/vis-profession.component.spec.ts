import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisProfessionComponent } from './vis-profession.component';

describe('VisProfessionComponent', () => {
  let component: VisProfessionComponent;
  let fixture: ComponentFixture<VisProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisProfessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
