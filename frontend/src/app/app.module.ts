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
import { DialogModule } from 'primeng/dialog';
import { OverviewComponent } from './survey/overview.component';

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
        OverviewComponent
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
        DialogModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
