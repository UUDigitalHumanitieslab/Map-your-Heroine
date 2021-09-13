import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import * as Widgets from '@bokeh/bokehjs/build/js/lib/models/widgets/index';
// import * as Tables from '@bokeh/bokehjs/build/js/lib/models/widgets/tables/index';
// import { register_models } from '@bokeh/bokehjs/build/js/lib/base';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


// register_models(Widgets);
// register_models(Tables);
