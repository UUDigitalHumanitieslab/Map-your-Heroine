import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
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
import { RouterModule } from "@angular/router";
import { routes } from "./routes";

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
        FontAwesomeModule,
        ChipsModule,
        AutoCompleteModule,
        DialogModule,
        PanelModule,
        ChartModule,
        SurveyModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ], imports: [
        CommonModule,
        NoopAnimationsModule,
        FontAwesomeModule,
        ChipsModule,
        AutoCompleteModule,
        DialogModule,
        PanelModule,
        ChartModule,
        FormsModule,
        ReactiveFormsModule,
        SurveyModule,
        RouterModule.forRoot(routes),
    ], providers: [
        { provide: BackendService, useClass: FakeBackend },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
export class SharedTestingModule { }
