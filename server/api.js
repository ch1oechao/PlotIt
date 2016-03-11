(function() {
  'use strict';

  var mongoose = require('mongoose'),
      Pic = mongoose.model('Pic');

  exports.index = function(req, res, next) {
    res.render('index');
  };

  exports.getPics = function(req, res) {
    Pic.fetch(function(err, pics) {
      if (err) {
        throw err;
      }
      res.send({
        list: pics
      });
    })
  };

})();
 