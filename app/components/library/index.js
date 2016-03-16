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
  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
    this.pics = [];
  }

  getImages() {
    this.$http({
      method: 'get',
      url: '/images',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success((res) => {
      this.pics = res.list;
    }).error((err) => {
      console.log(err);
    })
  }

  findImage(id) {
    var self = this;
    this.$http({
      method: 'post',
      url: '/item',
      data: {id: id},
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      transformRequest: (obj) => {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      }
    }).success((res) => {
      self.$location.url('/plot/' + res._id)
    }).error((err) => {
      console.log(err);
    });
  }

  deleteImage(id) {
    console.log('delete ' + id);
  }

  shareImage(id) {
    console.log('share ' + id);
  }

}

libraryCtrl.$inject = ['$http', '$location'];

export default {
  tpl: libraryTpl,
  controller: libraryCtrl
};
