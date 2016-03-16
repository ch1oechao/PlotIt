import angular from 'angular';
import template from './index.html';
import './index.scss';

let libraryTpl = () => {
  return {
    template: template,
    controller: 'libraryCtrl',
    controllerAs: 'library',
    bindToController: true,
    restrict: 'E',
    link: (scope, element, attrs) => {
      scope.library.getImages()
    }
  }
};

class libraryCtrl {
  constructor($location, Service) {
    this.$location = $location;
    this.Service = Service;
    this.pics = [];
  }

  getImages() {
    this.Service.getPics((res) => {
      this.pics = res.list;
    });
  }

  findImage(id) {
    var self = this;
    this.Service.findPic(id, (res) => {
      self.$location.url('/plot/' + res._id);
    })
  }

  deleteImage(id) {
    console.log('delete ' + id);
  }

  shareImage(id) {
    console.log('share ' + id);
  }

}

libraryCtrl.$inject = ['$location', 'Service'];

export default {
  tpl: libraryTpl,
  controller: libraryCtrl
};
