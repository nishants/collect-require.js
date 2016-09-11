var
    fs                        = require("fs"),
    wrapperScript             = "src/templates/wrapper-script.js",
    apiNamePlaceHolder        = "SCRIPT_COLLECTOR_API_NAME",
    scriptMappingsPlaceholder = "/*!<SCRIPT-MAPPINGS>!*/";

module.exports = {
  create: function (scripts) {
    var relations = "",
        createScript = function (main, apiName) {
          return fs.readFileSync(wrapperScript)
              .toString('utf8')
              .replace(scriptMappingsPlaceholder, relations)
              .replace("/*!<SCRIPT-MAIN>!*/"    , main.replace(".js", ""))
              .replace(apiNamePlaceHolder       , apiName);
        };

    for (var path in scripts) {
      relations += "\"<relative-path>\" : function(){return <script-body>;},".replace("<relative-path>", path).replace("<script-body>", scripts[path]);
    }

    return {
      scripts : scripts,
      save: function(options){
        return fs.writeFileSync(options.path, createScript(options.main, options.apiName));
      }
    };
  }
};