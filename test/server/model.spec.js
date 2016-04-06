process.env.NODE_ENV = 'test';

var chai = require('chai'),
    chaiHttp = require('chai-http');

var server = '../../app.js',
    Pic = require('../../server/model.js');

var expect = chai.expect();

var pic;

function makeNonceStr() {
  var codes = [],
      codeSet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      codeSetLen = codeSet.length;
  for (var i = 0; i < 16; i++) {
    var random = Math.random() * 100,
        idx = random > codeSetLen ? (random % codeSetLen) : random;
    codes[i] = codeSet.substr(idx, 1);
  }

  return codes.join('');
}

// test
describe('<Unit Test Model', function() {
  describe('Model Pic:', function() {
    before(function(done) {
      var str = makeNonceStr();
      pic = {
        name: str,
        key: str
      };
      done();
    })

    describe('Before Method save', function() {
      it('should begin without test user', function(done) {
        Pic.find({name: pic.name}, function(err, pics) {
          expect(pics.length).to.equal(0);
          done();
        })
      })
    })

    describe('Pic save', function() {

      it('should save without problems', function(done) {
        var _pic = new Pic(pic);

        _pic.save(function(err) {
          expect(!!err).to.equal(false);
          _pic.remove(function(err) {
            expect(!!err).to.equal(false);
            done();
          });
        });
      });

      it('should fail to save an existing pic', function(done) {
        var _pic1 = new Pic(pic);

        _pic1.save(function(err) {
          expect(!!err).to.equal(false);

          var _pic2 = new Pic(pic)

          _pic2.save(function(err) {
            expect(!!err).to.equal(true);

            _pic1.remove(function(err) {
              if (!err) {
                _pic2.remove(function(err) {
                  done()
                })
              }
            })
          })
        })
      })
    })
  })
})