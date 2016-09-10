var expect      = require('chai').expect,
    helper      = require("../test-helper")
    collector   = require("../../src/collect-require");

describe('Create Standalone Script', function() {

  it('should combile script files', function () {
    var expected = "module.exports = \"from script one\";module.exports = \"from script two\";",
        actual   = collector.collect(helper.codebasePath);

    expect(expected).to.equal(actual);
  });
});