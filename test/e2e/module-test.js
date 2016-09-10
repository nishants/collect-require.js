var expect      = require('chai').expect,
    helper      = require("../test-helper")
    collector   = require("../../src/collect-require");

describe('Create Standalone Script', function() {

  it('should collect script files', function () {
    var expected = {
          "script-one"      : "module.exports = \"from script one\";",
          "two/script-two"  : "module.exports = \"from script two\";"
        },
        actual   = collector.collect(helper.codebasePath);

    expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected));
  });
});