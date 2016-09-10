var expect      = require('chai').expect,
    helper      = require("../test-helper")
    collector   = require("../../src/collect-require");

describe('Create Standalone Script', function() {

  it('should collect script files', function () {
    var expected = {
          "index"           : helper.indexContent,
          "script-one"      : helper.scriptOneContent,
          "two/script-two"  : helper.scriptTwoContent
        },
        actual   = collector.collect(helper.codebasePath).scripts;

    expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected));
  });

  it('should execute script files', function () {
    var standalone   = collector.collect(helper.codebasePath);
    var index = standalone.run("index");
    expect(index.get()).to.equal("from script two");
  });
});