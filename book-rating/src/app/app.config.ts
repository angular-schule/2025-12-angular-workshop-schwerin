import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withDebugTracing, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({
        scrollPositionRestoration: 'top',
    }),
    // withDebugTracing()
    withComponentInputBinding()),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
