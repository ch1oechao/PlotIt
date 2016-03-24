(function() {
  'use strict';
  
  var mongoose = require('mongoose');

  var PicSchema = new mongoose.Schema({
    name: {
      unique: true,
      type: String
    },
    key: {
      unique: true,
      type: String
    },
    size: {
      type: Number
    },
    imageSrc: {
      type: String
    },
    changeSrc: {
      type: String
    },
    imageConfig: {
      type: Object
    },
    meta: {
      createdAt: {
        type: Date,
        default: Date.now()
      },
      updatedAt: {
        type: Date,
        default: Date.now()
      }
    }
  });

  PicSchema.pre('save', function(next) {

    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }

    next()

  });

  PicSchema.statics = {
    fetch: function(cb) {
      return this.find({})
                 .sort('meta.updatedAt')
                 .exec(cb);
    },
    findById: function(id, cb) {
      return this.findOne({_id: id})
                 .exec(cb);
    }
  };

  module.exports = {
    pic: PicSchema
  };

})();
 