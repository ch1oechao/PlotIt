import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';

import newCanvas from './newCanvas';

const plotitApp = angular.module('app', [uirouter, newCanvas])
                  .config(routing);

export default plotitApp;
