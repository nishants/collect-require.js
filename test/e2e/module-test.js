var expect      = require('chai').expect,
    helper      = require("../test-helper")
    collector   = require("../../src/collect-require");

describe('Create Standalone Script', function() {

  it('should collect script files', function () {
    var expected = {
          "index"               : helper.indexContent,
          "script-one"          : helper.scriptOneContent,
          "two/script-two"      : helper.scriptTwoContent,
          "three/script-three"  : helper.scriptThreeContent,
          "three/three.five/script-three.five"  : helper.scriptThreeFiveContent,
        },
        actual   = collector.collect(helper.codebasePath).scripts;

    expect(actual).to.deep.equal(expected);
  });

  it('should execute script files', function () {
    var standalone  = collector.collect(helper.codebasePath),
        index       = standalone.run("index");
    expect(index.get()).to.equal("from script three");
  });

  it('should support ../ in require', function () {
    var standalone  = collector.collect(helper.codebasePath),
        actual      = standalone.run("three/three.five/script-three.five");
    expect(actual).to.equal("from script three");
  });

  it('should crate standalone script file', function () {
    var path        = helper.aWritableFilePath(),
        standalone  = collector.collect(helper.codebasePath);

    standalone.saveTo("index", path, "Jeyson");
    helper.evalScript(path);

    expect(Jeyson.get()).to.equal("from script three");
  });

  it('should allow specifying entry file', function () {
    var path        = helper.aWritableFilePath(),
        standalone  = collector.collect(helper.codebasePath);

    standalone.saveTo("two/script-two.js", path, "Jeyson");
    helper.evalScript(path);

    expect(Jeyson).to.equal("from script three");
  });

});