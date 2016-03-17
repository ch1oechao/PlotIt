import angular from 'angular';
import template from './index.html';
import './index.scss';

let popoverTpl = () => {
  return {
    template: template,
    controller: 'popoverCtrl',
    controllerAs: 'popover',
    bindToController: true,
    restrict: 'E'
  }
};

class popoverCtrl {
  constructor() {
    this.isShow = false;
    this.isEditable = true;
    this.tip = "是否保存该图片"
  }

  open() {
    this.isShow = true;
  }

  close() {
    this.isShow = false;
  }

}

export default {
  tpl: popoverTpl,
  controller: popoverCtrl
};
