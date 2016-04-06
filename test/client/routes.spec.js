var ngMidwayTester = require('../libs/ngMidwayTester.js');
var expect = require('chai').expect;
var appName = 'plotit';

describe('Testing Routes: ', () => {
  var tester;

  beforeEach(() => {
    tester = ngMidwayTester(appName);
  });

  afterEach(() => {
    tester.destroy();
    tester = null;
  });

  it('should have a working home_path route', () => {
    tester.visit('/', () => {
      expect(tester.path()).to.equal('/home');
      var html = tester.rootElement().html();
      expect(html).to.contain('<library></library>');
    });
  });

  it('should have a working plot_path route', () => {
    tester.visit('/plot', () => {
      expect(tester.path()).to.equal('/plot');
      var html = tester.rootElement().html();
      expect(html).to.contain('<panel></panel>');
    });
  });
});
 