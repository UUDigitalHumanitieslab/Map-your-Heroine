import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, withXsrfConfiguration } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './survey/work.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectModule } from 'primeng/select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { OverviewComponent } from './survey/overview.component';
import { HeroComponent } from './survey/hero.component';
import { ResponseComponent } from './survey/response.component';
import { DownloadComponent } from './download/download.component';
import { VisOverviewComponent } from './visualisations/vis-overview.component';
import { VisHeroComponent } from './visualisations/vis-hero/vis-hero.component';
import { VisWorkComponent } from './visualisations/vis-work/vis-work.component';
import { VisGenderComponent } from './visualisations/vis-gender/vis-gender.component';
import { VisAgencyComponent } from './visualisations/vis-agency/vis-agency.component';
import { VisIdentificationComponent } from './visualisations/vis-identification/vis-identification.component';
import { VisPersonalityComponent } from './visualisations/vis-personality/vis-personality.component';
import { VisAppearanceComponent } from './visualisations/vis-appearance/vis-appearance.component';
import { VisProfessionComponent } from './visualisations/vis-profession/vis-profession.component';
import { ResultComponent } from './survey/result.component';
import { SurveyModule } from 'survey-angular-ui';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        MenuComponent,
        HomeComponent,
        WorkComponent,
        OverviewComponent,
        HeroComponent,
        ResponseComponent,
        DownloadComponent,
        VisOverviewComponent,
        VisHeroComponent,
        VisWorkComponent,
        VisGenderComponent,
        VisAgencyComponent,
        VisIdentificationComponent,
        VisPersonalityComponent,
        VisAppearanceComponent,
        VisProfessionComponent,
        ResultComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        FormsModule,
        SelectModule,
        AutoCompleteModule,
        DialogModule,
        PanelModule,
        ReactiveFormsModule,
        ChartModule,
        SurveyModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi(), withXsrfConfiguration({
            cookieName: 'csrftoken',
            headerName: 'X-CSRFToken'
        })),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: ''
                }
            }
        })
    ]
})
export class AppModule { }
