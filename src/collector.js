require("./require-template");
var
    wrench                    = require("wrench"),
    fs                        = require("fs"),
    adapterScript             = require("./templates/adaptor-script.txt"),
    scriptPathPlaceholder     = "/*!<SCRIPT-PATH>!*/"
    scriptPlaceholder         = "/*!<SCRIPT>!*/",
    apiNamePlaceHolder        = "SCRIPT_COLLECTOR_API_NAME",
    scriptMappingsPlaceholder = "/*!<SCRIPT-MAPPINGS>!*/";

module.exports = {
  collect: function (baseDir) {
    var ifJSFile      = function (file) {return file.endsWith(".js");},
        toFileContent = function (file) {return {name: file.replace(new RegExp(".js$"), ""), content : fs.readFileSync(baseDir + "/" + file).toString('utf8')};},
        collected = {};

    wrench.readdirSyncRecursive(baseDir).filter(ifJSFile).map(toFileContent).forEach(function(script){
      collected[script.name] = adapterScript.replace(scriptPlaceholder, script.content).replace(scriptPathPlaceholder, script.name);
    });

    return collected;
  }
}