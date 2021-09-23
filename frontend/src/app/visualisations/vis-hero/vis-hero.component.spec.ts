import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisHeroComponent } from './vis-hero.component';

describe('VisHeroComponent', () => {
  let component: VisHeroComponent;
  let fixture: ComponentFixture<VisHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisHeroComponent ]
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
