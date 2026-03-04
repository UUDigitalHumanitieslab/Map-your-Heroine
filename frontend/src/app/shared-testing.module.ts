import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { of } from "rxjs";
import { BackendService } from "./services/backend.service";
import { ConfigService } from "./services/config.service";
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ChipsModule } from "primeng/chips";
import { AutoCompleteModule } from "primeng/autocomplete";
import { DialogModule } from "primeng/dialog";
import { PanelModule } from "primeng/panel";
import { ChartModule } from "primeng/chart";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

class FakeBackend {
    get() {
        return of(undefined);
    }

    post() {
        return of(undefined);
    }
}

class FakeConfig {
    get() {
        return Promise.resolve('/api/');
    }
}

@NgModule({
    imports: [
        CommonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        ChipsModule,
        AutoCompleteModule,
        DialogModule,
        PanelModule,
        ChartModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        ChipsModule,
        AutoCompleteModule,
        DialogModule,
        PanelModule,
        ChartModule,
    ],
    providers: [
        { provide: BackendService, useClass: FakeBackend },
        { provide: ConfigService, useClass: FakeConfig },
    ]
})
export class SharedTestingModule { }
