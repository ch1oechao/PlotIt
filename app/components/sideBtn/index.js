import angular from 'angular';
import template from './index.html';
import Canvas2image from '../../libs/canvas2image';
import qiniuC from '../../libs/qiniu.client';
import './index.scss';

let sideBtnTpl = () => {
  return {
    template: template,
    controller: 'sideBtnCtrl',
    controllerAs: 'sideBtn',
    bindToController: true,
    restrict: 'E',
    link: (scope, element, attrs) => {
      if (attrs.sideState === 'plot') {
        scope.sideBtn.isPlot = true;
      } else {
        scope.sideBtn.isPlot = false;
      }
    }
  }
};

class sideBtnCtrl {
  constructor($location, Service) {
    this.$location = $location;
    this.Service = Service;
    this.isPlot = false;
  }

  turnToCanvas() {
    this.$location.url('/plot');
  }

  turnToHome() {
    this.$location.url('/');
  }

  saveToImage() {
    var canvas = document.getElementById('plotitCanvas'),
        context = canvas.getContext('2d');

    var imageBase64 = this._convertCanvasToBase64(canvas);

    // upload to Qiniu
    

    // save to  mongoDB
    var img = {
      name: '',
      imageSrc: ''
    }
    this.Service.savePic(img, (res) => {
      console.log(res);
    });

    // Canvas2image.saveAsPNG(canvas);
  }

  _convertCanvasToBase64(canvas) {
    return canvas.toDataURL();
  }

}

sideBtnCtrl.$inject = ['$location', 'Service'];

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
