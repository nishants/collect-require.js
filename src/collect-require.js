var
    wrench = require("wrench"),
    fs = require("fs");

module.exports = {
  collect: function (baseDir, exclude) {

    var ifJSFile      = function (file) {return file.endsWith(".js");},
        toFileContent = function (file) {return fs.readFileSync(baseDir + "/" + file).toString('utf8');};

    return wrench.readdirSyncRecursive(baseDir).filter(ifJSFile).map(toFileContent).join("");
  }
}