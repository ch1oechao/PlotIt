import angular from 'angular';
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
  constructor($scope, Upload, $timeout) {
    this.$scope = $scope;
    this.Upload = Upload;
    this.$timeout = $timeout;
    this.hasPic = false;
    this.imageUrl = '';
    
    this.$scope.$watch('panel.files', this.upload(this.files));
  }

  upload(files) {
    var self = this,
        reader = new FileReader();

    return (files) => {
      if (files && files.length) {

        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (!file.$error) {
            self.imgSrc = window.URL.createObjectURL(file);
            self.hasPic = true;
            self.renderToCanvas(self.imgSrc);  
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

panelCtrl.$inject = ['$scope', 'Upload', '$timeout'];

export default {
  tpl: panelTpl,
  controller: panelCtrl
};
