export default class service {
  constructor($http) {
    this.$http = $http;
  }

  genToken(fn) {
    this.$http({
      method: 'get',
      url: '/uptoken',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success((res) => {
      var token = res.uptoken;
      if (fn) {
        fn(token)
      } else {
        return token;
      }
    }).error((err) => {
      console.log(err);
    })
  }

  getPics(fn) {
    this.$http({
      method: 'get',
      url: '/list',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success((res) => {
      if (fn) {
        fn(res);
      } else {
        return res;
      }
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
        if (fn) {
          fn(res);
        } else {
          return res;
        }
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
        if (fn) {
          fn(res);
        } else {
          return res;
        }
      }).error((err) => {
        console.log(err);
      });
    }
  }

  deletePic(id, fn) {
    if (id) {
      this.$http.delete('/image/' + id)
      .success((res) => {
        if (fn) {
          fn(res);
        } else {
          return res;
        }
      }).error((err) => {
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
        if (fn) {
          fn(res);
        } else {
          return res;
        }
      }).error((err) => {
        console.log(err);
      });
    }
  }

}

service.$inject = ['$http'];
 