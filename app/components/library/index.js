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
  constructor($location, Service, $route, $rootScope) {
    this.$location = $location;
    this.Service = Service;
    this.$route = $route;
    this.$rootScope = $rootScope;
    this.curTime = +(new Date());
    this.pics = [];
  }

  getImages() {
    this.Service.getPics((res) => {
      this.pics = res.list;
      this.$rootScope.pics = res.list;
    });
  }

  findImage(id) {
    this.$location.url('/plot/' + id);
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
    this.Service.findPic(id, (res) => {
      if (res) {
        this.Service.shareToWeibo(res);
        // this.Service.shareToWechat();
      }
    });
  }
}

libraryCtrl.$inject = ['$location', 'Service', '$route', '$rootScope'];

export default {
  tpl: libraryTpl,
  controller: libraryCtrl
};
