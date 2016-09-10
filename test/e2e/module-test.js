var expect      = require('chai').expect,
    helper      = require("../test-helper")
    collector   = require("../../src/collect-require");

describe('Create Standalone Script', function() {

  it('should collect script files', function () {
    var expected = {
          "index"           : "var one = require(\"./script-one\");\nmodule.exports = function(){return one;};",
          "script-one"      : "module.exports = \"from script one\";",
          "two/script-two"  : "module.exports = \"from script two\";"
        },
        actual   = collector.collect(helper.codebasePath).scripts;

    expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected));
  });

  it('should execute script files', function () {
    var standalone   = collector.collect(helper.codebasePath);
    expect(standalone.run("index")()).to.equal("from script one");
  });
});