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
        var item = res,
            appkey = 1976616587,
            imageSrc = (item.changeSrc || item.imageSrc) + '?' + (+new Date()),
            title = item.name + ' 分享自#PlotIt#',
            appUrl = 'https://github.com/zchen9/PlotIt/',
            charset = 'utf-8';

        (function(s,d,e,r,l,p,t,z,c){
          var f = 'http://v.t.sina.com.cn/share/share.php?appkey=' + appkey,
              u = z || d.location,
              p = ['&url=', e(u), '&title=', e(t||d.title), '&source=', e(r), '&sourceUrl=', e(l), '&content=', c || 'gb2312', '&pic=', e(p || '')].join('');
              function a(){
                if (!window.open([f,p].join(''), 'mb', ['toolbar=0,status=0,resizable=1,width=440,height=430,left=', (s.width-440)/2, ',top=', (s.height-430)/2].join(''))){
                  u.href=[f,p].join('');
                }    
              }
              if (/Firefox/.test(navigator.userAgent)) {
                setTimeout(a,0);
              } else {
                a()
              };
        })(screen,document,encodeURIComponent,'','', imageSrc, title, appUrl, charset)
      }
    });
  }
}

libraryCtrl.$inject = ['$location', 'Service', '$route', '$rootScope'];

export default {
  tpl: libraryTpl,
  controller: libraryCtrl
};
