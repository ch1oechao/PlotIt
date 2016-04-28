import WX from './libs/wechat.client';

export default class service {
  constructor($http) {
    this.$http = $http;
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    };
  }

  transformRequest(obj) {
    var str = [];
    for (var p in obj) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  }

  resolve(fn, res) {
    if (fn) {
      fn(res);
    } else {
      return res;
    }
  }

  genToken(key, fn) {
    if (key && typeof key === 'function') {
      var fn = key,
          key = '';
    }
    this.$http({
      method: 'post',
      url: '/uptoken',
      data: {key: key},
      headers: this.headers
    }).success((res) => {
      this.resolve(fn, res.uptoken);
    }).error((err) => {
      console.log(err);
    });
  }

  getPics(fn) {
    this.$http({
      method: 'get',
      url: '/list',
      headers: this.headers
    }).success((res) => {
      this.resolve(fn, res);
    }).error((err) => {
      console.log(err);
    })
  }

  findPic(id, fn) {
    if (id) {
      this.$http({
        method: 'post',
        url: '/image',
        data: {id: id},
        headers: this.headers,
        transformRequest: this.transformRequest
      }).success((res) => {
        this.resolve(fn, res);
      }).error((err) => {
        console.log(err);
      });
    }
  }

  savePic(img, fn) {
    if (img.name && img.key && img.imageSrc) {
      this.$http({
        method: 'post',
        url: '/save',
        data: img,
        headers: this.headers,
        transformRequest: this.transformRequest
      }).success((res) => {
        this.resolve(fn, res);
      }).error((err) => {
        console.log(err);
      });
    }
  }

  updatePic(img, fn) {
    if (img.id) {
      this.$http({
        method: 'post',
        url: '/update',
        data: img,
        headers: this.headers,
        transformRequest: this.transformRequest
      }).success((res) => {
        this.resolve(fn, res);
      }).error((err) => {
        console.log(err);
      });
    }
  }

  deletePicFromQiniu(id, fn) {
    if (id) {
      this.$http.delete('/qiniu/' + id)
                .success((res) => {
                  this.resolve(fn, res);
                })
                .error((err) => {
                  console.log(err);
                });
    }
  }

  deletePic(id, fn) {
    if (id) {
      this.$http.delete('/image/' + id)
                .success((res) => {
                  this.resolve(fn, res);
                })
                .error((err) => {
                  console.log(err);
                });
    }
  }

  downloadPic(id, fn) {
    if (id) {
      this.$http({
        method: 'post',
        url: '/download',
        data: {id: id},
        headers: this.headers,
        transformRequest: this.transformRequest
      }).success((res) => {
        this.resolve(fn, res);  
      }).error((err) => {
        console.log(err);
      });
    }
  }

  shareToWeibo(item) {
    var appkey = 1976616587,
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

  shareToWechat() {
    var config = {
      'aid': 'wxf22f393f544c7f24',
      'ase': '7a478172fdd6c82a80641e913cebeb0d'
    };

    var getAccessToken = (config) => {

      this.$http({
        method: 'get',
        url: url
      }).success((res) => {
        console.log(res);
      }).error((err) => {
        console.log(err);
      });

    }

    getAccessToken(config);

  }

}

service.$inject = ['$http'];
 