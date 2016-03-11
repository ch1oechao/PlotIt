import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngRoute from 'angular-route';
import routes from './main.routes';

import '../public/styles/main.scss';

import library from './library';
import sidebar from './sidebar';
import sideBtn from './sideBtn';
import panel from './panel';
import palette from './palette';

const MODULE_NAME = 'plotit';
const plotitApp = angular.module(MODULE_NAME, [uiRouter, ngRoute]);

// config
plotitApp.config(routes);

// directive
plotitApp
  .directive('library', library.tpl)
  .directive('sidebar', sidebar.tpl)
  .directive('sideBtn', sideBtn.tpl)
  .directive('panel', panel.tpl)
  .directive('palette', palette.tpl);

// controller
plotitApp
  .controller('libraryCtrl', library.controller)
  .controller('sidebarCtrl', sidebar.controller)
  .controller('sideBtnCtrl', sideBtn.controller)
  .controller('panelCtrl', panel.controller)
  .controller('paletteCtrl', palette.controller);

export default MODULE_NAME;
 