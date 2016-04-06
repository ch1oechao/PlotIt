var ngMidwayTester = require('../../libs/ngMidwayTester.js');
var expect = require('chai').expect;
var appName = 'plotit';
 
describe('Testing Palette: ', () => {
  var tester,
      $scope = {};

  if (tester) {
    tester.destroy();
  }
  tester = ngMidwayTester(appName);
  
  var ctrl = tester.controller('paletteCtrl', {$scope: $scope});

  it('should init activeMenu when load the paletteCtrl', (done) => {
    expect(ctrl.activeMenu).to.equal('filter');
    done();
  });

  it('should inject dependency', (done) => {
    var $injects = ['$scope'];
    Array.prototype.forEach.call($injects, (inject) => {
      expect(!!ctrl[inject]).to.equal(true);
    });
    done();
  });

  tester.destroy();
  tester = null;

});
