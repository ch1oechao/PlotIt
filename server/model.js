(function() {
  'use strict';

  var mongoose = require('mongoose');
  var Schema = require('./schema');

  module.exports = mongoose.model('Pic', Schema.pic);
  
})();
