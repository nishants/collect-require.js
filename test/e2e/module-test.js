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


  it('should support ../ in require', function () {
    var path        = helper.aWritableFilePath(),
        standalone  = collector.collect(helper.codebasePath);

    standalone.save({
      buildNashorn : path,
      main          : "three/three.five/script-three.five" ,
      apiName       : "Jeyson",
    });

    helper.evalScript(path);
  });

  it('should create standalone Nashorn script', function () {
    var path        = helper.aWritableFilePath(),
        standalone  = collector.collect(helper.codebasePath);

    standalone.save({
      buildNashorn    : path,
      main    : "index.js" ,
      apiName : "Jeyson",
    });

    helper.evalScript(path);

    expect(Jeyson.get()).to.equal("from script three");
  });

  it('should create standalone Browser script', function () {
    var path        = helper.aWritableFilePath(),
        standalone  = collector.collect(helper.codebasePath);

    standalone.save({
      buildBrowser    : path,
      main    : "index.js" ,
      apiName : "Jeyson",
    });

    GLOBAL.window = GLOBAL;

    helper.evalScript(path);

    expect(Jeyson.get()).to.equal("from script three");
  });

  it('should allow specifying entry file', function () {
    var path        = helper.aWritableFilePath(),
        standalone  = collector.collect(helper.codebasePath);


    standalone.save({
          buildNashorn    : path,
          main    : "two/script-two.js",
          apiName : "ScriptTwo",
    });

    helper.evalScript(path);

    expect(ScriptTwo).to.equal("from script three");
  });

});