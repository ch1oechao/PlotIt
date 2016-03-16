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
  constructor($location, Service, $route) {
    this.$location = $location;
    this.Service = Service;
    this.$route = $route;
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

  downloadImage(id) {
    var self = this;
    this.Service.downloadPic(id, (res) => {
      if (res.url) {
        window.open(res.url);
      }
    });
  }

  deleteImage(id) {
    var self = this;
    this.Service.deletePic(id, (res) => {
      if (res.success) {
        // reload images
        this.getImages();
      }
    });
  }

  shareImage(id) {
    console.log('share ' + id);
  }

}

libraryCtrl.$inject = ['$location', 'Service', '$route'];

export default {
  tpl: libraryTpl,
  controller: libraryCtrl
};
