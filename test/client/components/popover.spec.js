var ngMidwayTester = require('../../libs/ngMidwayTester.js');
var expect = require('chai').expect;
var appName = 'plotit';
 
describe('Testing Popover: ', () => {
  var tester,
      $scope = {};

  if (tester) {
    tester.destroy();
  }
  tester = ngMidwayTester(appName);
  
  var ctrl = tester.controller('popoverCtrl', {$scope: $scope});

  it('should init layout when load the popoverCtrl', (done) => {
    expect(ctrl.isShow).to.equal(false);
    expect(ctrl.isEditable).to.equal(false);
    done();
  });

  it('should inject dependency', (done) => {
    var $injects = ['$scope'];
    Array.prototype.forEach.call($injects, (inject) => {
      expect(!!ctrl[inject]).to.equal(true);
    });
    done();
  });

  it('should open popover', (done) => {
    ctrl.open();
    expect(ctrl.isShow).to.equal(true);
    done();
  });

  it('should close popover', (done) => {
    ctrl.close();
    expect(ctrl.isShow).to.equal(false);
    done();
  });

  it('should check input when input val is nothing', (done) => {
    ctrl.curImageName = null;
    expect(ctrl.checkInput()).to.equal(false);
    done();
  });

  it('should check input when input is editable', (done) => {
    ctrl.isEditable = true;
    expect(ctrl.checkInput()).to.equal(false);
    done();
  });

  it('should check input when input has val and it is uneditable', (done) => {
    ctrl.curImageName = '2333';
    ctrl.isEditable = false;
    expect(ctrl.checkInput()).to.equal(true);
    done();
  });

  tester.destroy();
  tester = null;

});
