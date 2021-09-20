import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './survey/work.component';
import { RestangularModule } from 'ngx-restangular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule} from 'primeng/multiselect';
import { ChipsModule} from 'primeng/chips';
import { CheckboxModule} from 'primeng/checkbox';
import { RadioButtonModule} from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { OverviewComponent } from './survey/overview.component';
import { HeroComponent } from './survey/hero.component';
import { ResponseComponent } from './survey/response.component';

export function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
        const token = decodeURIComponent(document.cookie);
        if (token) {
            const csrf = token.split(';').filter(item => item.trim().startsWith('csrft'))[0].split('=')[1];
            return {
                headers: Object.assign(headers, { 'X-CSRFToken': csrf }),
            };
        }
    });
    RestangularProvider.setRequestSuffix('/');
}

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        MenuComponent,
        HomeComponent,
        WorkComponent,
        OverviewComponent,
        HeroComponent,
        ResponseComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'csrftoken',
            headerName: 'X-CSRFToken'
        }),
        RestangularModule.forRoot(RestangularConfigFactory),
        DropdownModule,
        MultiSelectModule,
        CheckboxModule,
        ChipsModule,
        RadioButtonModule,
        DialogModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
