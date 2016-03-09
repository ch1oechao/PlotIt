import angular from 'angular';

import '../public/styles/main.scss';

import library from './library';
import sidebar from './sidebar';
import sideBtn from './sideBtn';

const MODULE_NAME = 'plotit';
const plotitApp = angular.module(MODULE_NAME, []);

// directive
plotitApp
  .directive('library', library.tpl)
  .directive('sidebar', sidebar.tpl)
  .directive('sideBtn', sideBtn.tpl);

// controller
plotitApp
  .controller('libraryCtrl', library.controller)
  .controller('sidebarCtrl', sidebar.controller)
  .controller('sideBtnCtrl', sideBtn.controller);

export default MODULE_NAME;
 