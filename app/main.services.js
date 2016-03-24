export default class service {
  constructor($http) {
    this.$http = $http;
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
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
}

service.$inject = ['$http'];
 