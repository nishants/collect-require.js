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

    var
        parentOf = function(path){
          path = path.split("/");
          return path.slice(0, path.length-1).join("/");
        },
        resolveRequire=  function(fromPath, requiredPath){
          var path  = requiredPath.replace(new RegExp("^./"), ""),
              from  = parentOf(fromPath);
          while(-1 != path.indexOf("../")){
            path = path.replace("../", "");
            from = parentOf(from);
          }
          return (from ? from + "/" : "") + path;
        },
        standalone = {
          scripts       : collected,
          run : function (script) {
            var module  = {exports: null},
                require = function (requiredPath) {
                  return standalone.run(resolveRequire(script, requiredPath));
                };
            eval(this.scripts[script]);
            return module.exports;
          }
        };
    return standalone;
  }
}