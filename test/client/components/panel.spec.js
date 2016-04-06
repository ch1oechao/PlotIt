var ngMidwayTester = require('../../libs/ngMidwayTester.js');
var expect = require('chai').expect;
var appName = 'plotit';
 
describe('Testing Panel: ', () => {
  var tester,
      $scope = {};

  if (tester) {
    tester.destroy();
  }
  tester = ngMidwayTester(appName);
  
  var ctrl = tester.controller('panelCtrl', {$scope: $scope});

  it('should init layout when load the panelCtrl', (done) => {
    expect(ctrl.hasImage).to.equal(false);
    done();
  });

  it('should inject dependency', (done) => {
    var $injects = ['$scope', 'Service', '$stateParams', '$rootScope', '$location'];
    Array.prototype.forEach.call($injects, (inject) => {
      expect(!!ctrl[inject]).to.equal(true);
    });
    done();
  });

  tester.destroy();
  tester = null;

});
