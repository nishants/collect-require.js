var
    fs                        = require("fs"),
    wrapperScript             = "src/templates/wrapper-script.js",
    apiNamePlaceHolder        = "SCRIPT_COLLECTOR_API_NAME",
    scriptMappingsPlaceholder = "/*!<SCRIPT-MAPPINGS>!*/";

module.exports = {
  create: function (scripts) {
    var scriptMapping = "";

    // create tuples of type "<name> : <value>, <name> : <value>,"
    for (var path in scripts) {
      scriptMapping += "\"<relative-path>\" : function(){return <script-body>;},".replace("<relative-path>", path).replace("<script-body>", scripts[path]);
    }

    return {
      scripts : scripts,
      save: function(options){
        return fs.writeFileSync(options.path,
            fs.readFileSync(wrapperScript)
            .toString('utf8')
            .replace(scriptMappingsPlaceholder, scriptMapping)
            .replace("/*!<SCRIPT-MAIN>!*/"    , options.main.replace(".js", ""))
            .replace(apiNamePlaceHolder       , options.apiName));
      }
    };
  }
};