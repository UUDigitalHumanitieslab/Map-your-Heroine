import { Routes } from '@angular/router';
import { DownloadComponent } from './download/download.component';

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
        path: 'download',
        component: DownloadComponent,
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

export { routes };
