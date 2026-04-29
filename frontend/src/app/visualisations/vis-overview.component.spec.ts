import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisOverviewComponent } from './vis-overview.component';
import { SharedTestingModule } from '../shared-testing.module';
import { VisAgencyComponent } from './vis-agency/vis-agency.component';
import { VisAppearanceComponent } from './vis-appearance/vis-appearance.component';
import { VisGenderComponent } from './vis-gender/vis-gender.component';
import { VisHeroComponent } from './vis-hero/vis-hero.component';
import { VisIdentificationComponent } from './vis-identification/vis-identification.component';
import { VisPersonalityComponent } from './vis-personality/vis-personality.component';
import { VisProfessionComponent } from './vis-profession/vis-profession.component';
import { VisWorkComponent } from './vis-work/vis-work.component';

describe('VisOverviewComponent', () => {
    let component: VisOverviewComponent;
    let fixture: ComponentFixture<VisOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                VisOverviewComponent,
                VisAgencyComponent,
                VisAppearanceComponent,
                VisGenderComponent,
                VisHeroComponent,
                VisIdentificationComponent,
                VisPersonalityComponent,
                VisProfessionComponent,
                VisWorkComponent,
            ],
            imports: [SharedTestingModule],
        }).compileComponents();
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
