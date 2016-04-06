var ngMidwayTester = require('../../libs/ngMidwayTester.js');
var expect = require('chai').expect;
var appName = 'plotit';
 
describe('Testing Library: ', () => {
  var tester,
      $scope = {};

  if (tester) {
    tester.destroy();
  }
  tester = ngMidwayTester(appName);
  
  var ctrl = tester.controller('libraryCtrl');

  it('should init pics when load the libraryCtrl', (done) => {
    expect(ctrl.pics.length).to.equal(0);
    done();
  });

  it('should inject dependency', (done) => {
    var $injects = ['$location', 'Service', '$route', '$rootScope'];
    Array.prototype.forEach.call($injects, (inject) => {
      expect(!!ctrl[inject]).to.equal(true);
    });
    done();
  });

  tester.destroy();
  tester = null;

});
