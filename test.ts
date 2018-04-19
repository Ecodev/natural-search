// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Then we find all the tests.
const contextApps = require.context('./demo', true, /\.spec\.ts$/);
contextApps.keys().map(contextApps);

const contextLibs = require.context('./lib', true, /\.spec\.ts$/);
contextLibs.keys().map(contextLibs);
