import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { OverviewComponent  } from './survey/overview.component';
import { WorkComponent } from './survey/work.component';
import { VisOverviewComponent } from './visualisations/vis-overview.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'submit',
        component: OverviewComponent,
    },
    {
        path: 'results',
        component: VisOverviewComponent,
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

export { routes };
