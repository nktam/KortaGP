import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {HttpClientModule} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';
import {firebaseProviders} from "./firebase.config";

export const appConfig: ApplicationConfig={
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(HttpClientModule), firebaseProviders]
};