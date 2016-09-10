var
    wrench  = require("wrench"),
    fs      = require("fs");

module.exports = {
  collect: function (baseDir, exclude) {
    var ifJSFile      = function (file) {return file.endsWith(".js");},
        toFileContent = function (file) {return {name: file.replace(new RegExp(".js$"), ""), content : fs.readFileSync(baseDir + "/" + file).toString('utf8')};},
        collected = {};

    wrench.readdirSyncRecursive(baseDir).filter(ifJSFile).map(toFileContent).forEach(function(script){
      collected[script.name] = script.content;
    });

    var standalone = {
      scripts       : collected,
      resolveRequire: function(fromPath, requiredPath){
        var path  = requiredPath.replace(new RegExp("^./"), "");
        return standalone.run(path);
      },
      run : function (path) {
        var module  = {exports: null},
            require = function (requirePath) {return standalone.resolveRequire(path, requirePath);};
        eval(this.scripts[path]);
        return module.exports;
      }
    };
    return standalone;
  }
}