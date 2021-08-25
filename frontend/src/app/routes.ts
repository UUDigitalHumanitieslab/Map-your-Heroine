import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { WorkComponent } from './survey/work.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'submit-work',
        component: WorkComponent,
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

export { routes };
