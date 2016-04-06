var ngMidwayTester = require('../../libs/ngMidwayTester.js');
var expect = require('chai').expect;
var appName = 'plotit';
 
describe('Testing Sidebtn: ', () => {
  var tester,
      $scope = {};

  if (tester) {
    tester.destroy();
  }
  tester = ngMidwayTester(appName);
  
  var ctrl = tester.controller('sideBtnCtrl', {$scope: $scope});

  it('should init layout when load the sideBtnCtrl', (done) => {
    expect(ctrl.isPlot).to.equal(false);
    expect(ctrl.isChange).to.equal(false);
    done();
  });

  it('should inject dependency', (done) => {
    var $injects = ['$scope', '$location', 'Service', '$rootScope', '$route'];
    Array.prototype.forEach.call($injects, (inject) => {
      expect(!!ctrl[inject]).to.equal(true);
    });
    done();
  });

  it('should turn to home', (done) => {
    ctrl.turnToHome(false);
    expect(ctrl.$location.path()).to.equal('/home');
    done();
  });

  it('should turn to canvas', (done) => {
    ctrl.turnToCanvas();
    expect(ctrl.$location.path()).to.equal('/plot');
    done();
  });

  tester.destroy();
  tester = null;

});
