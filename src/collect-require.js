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

    return {
      scripts : collected,
      run     : function(path){
        var module = {exports : null};
        eval(this.scripts[path]);
        return module.exports;
      }
    };
  }
}