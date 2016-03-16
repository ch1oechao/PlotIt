import angular from 'angular';
import qiniuC from '../../libs/qiniu.client';
import template from './index.html';
import './index.scss';

let panelTpl = () => {
  return {
    template: template,
    controller: 'panelCtrl',
    controllerAs: 'panel',
    bindToController: true,
    restrict: 'E'
  }
};

class panelCtrl {
  constructor($scope, Service, $stateParams) {
    this.$scope = $scope;
    this.Service = Service;
    this.$stateParams = $stateParams;
    this.hasImage = false;
    
    this.$scope.$watch('panel.files', this.uploadImage(this.files));
    this.$scope.$watch('panel.$stateParams', this.renderImages(this.$stateParams));
  }

  renderImages(item) {
    var self = this;
    return (item) => {
      var id = item.id;
      this.Service.findPic(id, (res) => {
        if (res) {
          self.hasImage = true;
          self.renderToCanvas(res.imageSrc);
        }
      });
    }
  }

  uploadImage(files) {
    var self = this,
        reader = new FileReader(),
        domain = 'http://7xrwkg.com1.z0.glb.clouddn.com/';

    return (files) => {
      if (files && files.length) {

        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (!file.$error) {

            // render image
            self.imgSrc = window.URL.createObjectURL(file);
            self.hasImage = true;
            self.renderToCanvas(self.imgSrc);

            // gen Qiniu token
            self.Service.genToken((token) => {
              // uploadImage image to Qiniu
              qiniuC.uploadImage(file, token, file.name, (imgSrc) => {
                // save file to MongoDB
                var img = {
                  name: file.name,
                  imageSrc: imgSrc
                }
                self.Service.savePic(img, (res) => {
                  console.log(res);
                });
              });
            });

          }
        }
      }
    }
  }

  renderToCanvas(imgSrc) {
    var canvas = document.getElementById('plotitCanvas'),
        context = canvas.getContext('2d'),
        image = new Image()
        image.src = imgSrc;

    image.onload = () => {

      var $panel = document.getElementsByClassName('panel-canvas')[0],
          panelW = $panel.clientWidth,
          panelH = $panel.clientHeight,
          imageW = image.width,
          imageH = image.height,
          scale;

      context.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = panelW;
      canvas.height = panelH;

      if (imageW > imageH) {
        scale = imageW / panelW;
      } else {
        scale = imageH / panelH;
      }

      imageW = imageW / scale;
      imageH = imageH / scale;

      var dx = (panelW - imageW) / 2,
          dy = (panelH - imageH) / 2;

      context.drawImage(image, dx, dy, imageW, imageH);
    } 
  }
}

panelCtrl.$inject = ['$scope', 'Service', '$stateParams'];

export default {
  tpl: panelTpl,
  controller: panelCtrl
};
