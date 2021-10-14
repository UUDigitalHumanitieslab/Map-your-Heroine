import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisOverviewComponent } from './vis-overview.component';

describe('VisOverviewComponent', () => {
  let component: VisOverviewComponent;
  let fixture: ComponentFixture<VisOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
