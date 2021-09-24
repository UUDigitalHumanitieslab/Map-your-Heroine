import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAppearanceComponent } from './vis-appearance.component';

describe('VisAppearanceComponent', () => {
  let component: VisAppearanceComponent;
  let fixture: ComponentFixture<VisAppearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisAppearanceComponent ]
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
