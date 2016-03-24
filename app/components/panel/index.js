import angular from 'angular';
import Plotit from '../../libs/plotit';
import QiniuC from '../../libs/qiniu.client';
import template from './index.html';
import './index.scss';

let panelTpl = () => {
  return {
    template: template,
    controller: 'panelCtrl',
    controllerAs: 'panel',
    bindToController: true,
    restrict: 'E',
    link: (scope, elements, attrs) => {
      var self = scope.panel;
      self.$scope.$watch('panel.files', self.uploadImageToCanvas.bind(self));
      self.$scope.$watch('panel.$stateParams', self.renderImages(self.$stateParams));
    }
  }
};

class panelCtrl {
  constructor($scope, Service, $stateParams, $rootScope, $location) {
    this.$scope = $scope;
    this.Service = Service;
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.PlotitUtil = new Plotit.Util();
    this.hasImage = false;
    this.newImage = null;
    this.curImageSrc = null;
    this.isLoading = false;
    this.imageConfig = false;
  }

  renderImages(item) {
    var self = this;
    return (item) => {
      var id = item.id,
          pics = this.$rootScope.pics || [];

      if (pics !== []) {
        // find from cache
        pics.map((item) => {
          if (item._id === id) {
            self.hasImage = true;
            self.imageConfig = JSON.parse(item.imageConfig || '{}');
            self.curImageSrc = item.imageSrc + '?' + (+new Date());
            self.PlotitUtil.renderImage(item.imageSrc, self.imageConfig);
          }
        });
      } else {
        // find pic from db
        this.Service.findPic(id, (res) => {
          if (!err) {
            self.hasImage = true;
            self.imageConfig = JSON.parse(res.imageConfig || '{}');
            self.curImageSrc = res.imageSrc + '?' + (+new Date());
            self.PlotitUtil.renderImage(res.imageSrc, self.imageConfig);  
          } else {
            // loading err, back to home
            self.$location.url('/');
          }
        });
      }
    }
  }

  uploadImageToCanvas(files) {
    var self = this,
        domain = 'http://7xrwkg.com1.z0.glb.clouddn.com/';

    if (files && files.length) {
      // loading image
      self.isLoading = true;

      var file = files[0],
          pics = self.$rootScope.pics || [];

      // check pics
      var hasPic = pics.filter((item) => {
        return item.name === self.filterName(file.name);
      });

      if (hasPic[0]) {

        // render image
        self.imgSrc = hasPic[0].imageSrc;
        // show canvas
        self.hasImage = true;
        self.curImageSrc = hasPic[0].imageSrc;
        this.PlotitUtil.renderImage(self.imgSrc);
        // loading finish
        self.isLoading = false;

      } else if (!file.$error && !!self.filterName(file.name)) {
        
        // render image
        self.imgSrc = window.URL.createObjectURL(file);
        // show canvas
        self.hasImage = true;
        self.curImageSrc = self.imgSrc;
        
        this.PlotitUtil.renderImage(self.imgSrc);

        // upload to qiniu
        self.uploadImageToQiniu(file); 

      } else {
        // loading finish
        self.isLoading = false;
        console.log('图片出错，请检查图片格式和名称是否正确！');
      }
    }
  }

  filterName(name) {
    var names = name.split('.'),
        fm = names[names.length - 1],
        formats = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'gif', 'GIF', 'bmp', 'BMP'];

    if (formats.indexOf(fm) !== -1) {
      names.pop();
      return names.join('');
    }

    return false;
  }

  uploadImageToQiniu(file) {
    var self = this,
        name = this.filterName(file.name),
        key = file.name,
        size = file.size;

    // gen Qiniu token
    this.Service.genToken((token) => {
      // uploadImage image to Qiniu
      QiniuC.uploadImage(file, token, key, (imgSrc) => {
        // save file to MongoDB
        var img = {
          name: name,
          key: key,
          size: size,
          imageSrc: imgSrc
        };

        self.Service.savePic(img, (res) => {
          if (res && res.success) {
            self.newImage = res.pic;
            // loading finish
            self.isLoading = false;
          }
        });
        
      });
    });

  }

}

panelCtrl.$inject = ['$scope', 'Service', '$stateParams', '$rootScope', '$location'];

export default {
  tpl: panelTpl,
  controller: panelCtrl
};
