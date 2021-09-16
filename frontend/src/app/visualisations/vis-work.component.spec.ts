import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisWorkComponent } from './vis-work.component';

describe('VisWorkComponent', () => {
  let component: VisWorkComponent;
  let fixture: ComponentFixture<VisWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisWorkComponent ]
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
