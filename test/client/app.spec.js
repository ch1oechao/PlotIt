var expect = require('chai').expect;
 
describe('Testing Modules: ', () => {
  var module;
  before(() => {
    module = angular.module('plotit');
  });

  it('should be registered', () => {
    expect(module).not.to.equal(null);
  });

  describe('Dependencies:', () => {
    var deps;
    var hasModule = (m) => {
      return deps.indexOf(m) >= 0;
    }

    before(() => {
      deps = module.value('appName').requires;
    });

    it('should have uiRouter as a dependency', () => {
      expect(hasModule('ui.router')).to.equal(true);
    });

    it('should have ngRoute as a dependency', () => {
      expect(hasModule('ngRoute')).to.equal(true);
    });

    it('should have ngFileUpload as a dependency', () => {
      expect(hasModule('ngFileUpload')).to.equal(true);
    });

  });
}); 
