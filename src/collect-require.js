var
    wrench            = require("wrench"),
    fs                = require("fs"),

    adapterScript     = "src/adaptor-script.js",
    wrapperScript     = "src/wrapper-script.js",

    scriptPathPlaceholder     = "/*!<SCRIPT-PATH>!*/"
    scriptPlaceholder         = "/*!<SCRIPT>!*/",
    apiNamePlaceHolder        = "SCRIPT_COLLECTOR_API_NAME",
    scriptMappingsPlaceholder = "/*!<SCRIPT-MAPPINGS>!*/";

module.exports = {
  collect: function (baseDir, exclude) {
    var ifJSFile      = function (file) {return file.endsWith(".js");},
        toFileContent = function (file) {return {name: file.replace(new RegExp(".js$"), ""), content : fs.readFileSync(baseDir + "/" + file).toString('utf8')};},
        collected = {};

    wrench.readdirSyncRecursive(baseDir).filter(ifJSFile).map(toFileContent).forEach(function(script){
      collected[script.name] = fs.readFileSync(adapterScript).toString('utf8').replace(scriptPlaceholder, script.content).replace(scriptPathPlaceholder, script.name);
    });

    standalone = {
      scripts       : collected,
      run : function (script) {
        return eval(this.scripts[script]);
      },
      toScript: function(main,apiName){
        var mappings = "";
        for(var path in standalone.scripts){
          mappings += "\"<relative-path>\" : function(){return <script-body>;},".replace("<relative-path>", path).replace("<script-body>", standalone.scripts[path]);;
        }
        return fs.readFileSync(wrapperScript).toString('utf8').replace(scriptMappingsPlaceholder, mappings).replace("/*!<SCRIPT-MAIN>!*/", main.replace(".js", "")).replace(apiNamePlaceHolder, apiName);
      },
      save: function(options){
        return fs.writeFileSync(options.path, standalone.toScript(options.main, options.apiName));
      }
    };
    return standalone;
  }
}