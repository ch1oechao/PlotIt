var ngMidwayTester = require('../../libs/ngMidwayTester.js');
var expect = require('chai').expect;
var appName = 'plotit';
 
describe('Testing Sidebar: ', () => {
  var tester,
      $scope = {};

  if (tester) {
    tester.destroy();
  }
  tester = ngMidwayTester(appName);
  
  var ctrl = tester.controller('sidebarCtrl', {$scope: $scope});

  it('should init layout when load the sidebarCtrl', (done) => {
    expect(ctrl.brand).to.equal('PlotIt');
    done();
  });

  tester.destroy();
  tester = null;

});
