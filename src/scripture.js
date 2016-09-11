require("./require-template");
var
    fs                        = require("fs"),
    wrapperScript             = require("./templates/wrapper-script.txt"),
    apiNamePlaceHolder        = "SCRIPT_COLLECTOR_API_NAME",
    scriptMappingsPlaceholder = "/*!<SCRIPT-MAPPINGS>!*/";

module.exports = {
  create: function (scripts) {
    var scriptMapping = "";

    for (var path in scripts) {
      scriptMapping += "\"<relative-path>\" : function(){return <script-body>;},".replace("<relative-path>", path).replace("<script-body>", scripts[path]);
    }

    return {
      scripts : scripts,
      save: function(options){
        return fs.writeFileSync(
            options.path,
            wrapperScript.replace(scriptMappingsPlaceholder, scriptMapping)
                         .replace("/*!<SCRIPT-MAIN>!*/"    , options.main.replace(".js", ""))
                         .replace(apiNamePlaceHolder       , options.apiName)
        );
      }
    };
  }
};