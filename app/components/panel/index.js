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
    var self = this;

    return (files) => {
      if (files && files.length) {

        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (!file.$error) {
            self.imgUrl = window.URL.createObjectURL(file);
            self.hasPic = true;
            self.renderToCanvas(self.imgUrl);
          }
        }
      }
    }
  }

  renderToCanvas(imgUrl) {
    var canvas = document.getElementById('plotitCanvas'),
        context = canvas.getContext('2d'),
        image = new Image()
        image.src = imgUrl;

    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    } 
  }

}

panelCtrl.$inject = ['$scope', 'Upload', '$timeout'];

export default {
  tpl: panelTpl,
  controller: panelCtrl
};
