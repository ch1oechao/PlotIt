import angular from 'angular';
import CanvasUtil from '../../libs/canvas.util';
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
    this.CanvasUtil = new CanvasUtil();
    this.hasImage = false;
    this.isLoading = false;

    this.$scope.$watch('panel.files', this.uploadImageToCanvas(this.files));
    this.$scope.$watch('panel.$stateParams', this.renderImages(this.$stateParams));
  }

  renderImages(item) {
    var self = this;
    return (item) => {
      var id = item.id;
      this.Service.findPic(id, (res) => {
        if (res) {
          self.hasImage = true;
          this.CanvasUtil.render(res.imageSrc);
        }
      });
    }
  }

  uploadImageToCanvas(files) {
    var self = this,
        reader = new FileReader(),
        domain = 'http://7xrwkg.com1.z0.glb.clouddn.com/';

    return (files) => {
      if (files && files.length) {
        // loading image
        self.isLoading = true;
        var file = files[0];
        if (!file.$error) {
          // render image
          self.imgSrc = window.URL.createObjectURL(file);
          // show canvas
          self.hasImage = true;
          this.CanvasUtil.render(self.imgSrc);

          // upload to qiniu
          self.uploadImageToQiniu(file);          
        }
      }
    }
  }

  uploadImageToQiniu(file) {
    var self = this;
    // gen Qiniu token
    this.Service.genToken((token) => {
      // uploadImage image to Qiniu
      qiniuC.uploadImage(file, token, file.name, (imgSrc) => {
        // save file to MongoDB
        var img = {
          name: file.name,
          imageSrc: imgSrc
        }
        self.Service.savePic(img, (res) => {
          if (res && res.success) {
            // loading finish
            self.isLoading = false;
          }
        });
      });
    });
  }

}

panelCtrl.$inject = ['$scope', 'Service', '$stateParams'];

export default {
  tpl: panelTpl,
  controller: panelCtrl
};
