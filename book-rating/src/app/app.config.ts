import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withDebugTracing, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
      // withDebugTracing()
      withComponentInputBinding()
    )
  ]
};
