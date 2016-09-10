var
    wrench = require("wrench"),
    fs = require("fs");

module.exports = {
  collect: function (baseDir, exclude) {

    var ifJSFile      = function (file) {return file.endsWith(".js");},
        toFileContent = function (file) {
          return {
            name: file.replace(".js", ""),
            content : fs.readFileSync(baseDir + "/" + file).toString('utf8')
          };
        },
        scripts = wrench.readdirSyncRecursive(baseDir).filter(ifJSFile).map(toFileContent),
        collected = {};

    scripts.forEach(function(script){
      collected[script.name] = script.content;
    });

    return collected;
  }
}