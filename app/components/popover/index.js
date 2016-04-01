import angular from 'angular';
import template from './index.html';
import './index.scss';

let popoverTpl = () => {
  return {
    template: template,
    controller: 'popoverCtrl',
    controllerAs: 'popover',
    bindToController: true,
    restrict: 'E',
    link: (scope, attrs, element) => {
      var self = scope.popover,
          $scope = self.$scope;

      $scope.$watch('panel.curImageName', self.getCurImageName.bind(self));
    }
  }
};

class popoverCtrl {
  constructor($scope) {
    this.$scope = $scope;
    this.isShow = false;
    this.isEditable = false;
    this.tip = "是否保存当前图片"
  }

  getCurImageName(val) {
    this.curImageName = val;
  }

  open() {
    this.isShow = true;
  }

  close() {
    this.isShow = false;
  }

  cancel(sidebtn) {
    this.close();
    sidebtn.turnToHome();
  }

  check(sidebtn) {
    if (this.checkInput()) {
      sidebtn.uploadImage(this.curImageName);
      this.close();
    }
  }

  checkName() {
    if (!!this.curImageName) {
      this.isEditable = this.isEditError = this.isTextError = false;
    } else {
      this.isTextError = true;
    }
  }

  checkInput() {
    var res = true;
    if (!this.curImageName) {
      this.isTextError = true;
      res = false;
    }
    if (this.isEditable) {
      this.isEditError = true;
      res = false;
    }
    return res;
  }

}

popoverCtrl.$inject = ['$scope'];

export default {
  tpl: popoverTpl,
  controller: popoverCtrl
};
