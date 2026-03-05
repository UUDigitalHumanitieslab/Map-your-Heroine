import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { of } from "rxjs";
import { BackendService } from "./services/backend.service";
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ChipsModule } from "primeng/chips";
import { AutoCompleteModule } from "primeng/autocomplete";
import { DialogModule } from "primeng/dialog";
import { PanelModule } from "primeng/panel";
import { ChartModule } from "primeng/chart";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SurveyModule } from "survey-angular-ui";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

class FakeBackend {
    get() {
        return of(undefined);
    }

    post() {
        return of(undefined);
    }
}

@NgModule({
    exports: [
        CommonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        FontAwesomeModule,
        ChipsModule,
        AutoCompleteModule,
        DialogModule,
        PanelModule,
        ChartModule,
        SurveyModule,
        FormsModule,
        ReactiveFormsModule,
    ], imports: [
        CommonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        FontAwesomeModule,
        ChipsModule,
        AutoCompleteModule,
        DialogModule,
        PanelModule,
        ChartModule,
        FormsModule,
        ReactiveFormsModule,
        SurveyModule
    ], providers: [
            { provide: BackendService, useClass: FakeBackend },
            provideHttpClient(withInterceptorsFromDi()),
            provideHttpClientTesting(),
        ]
})
export class SharedTestingModule { }
