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
            return eval(this.scripts[script]);
          },
          toScript: function(main,apiName){
            var mappings = "";
            for(var path in standalone.scripts){
              mappings += "\"<relative-path>\" : function(){return <script-body>;},".replace("<relative-path>", path).replace("<script-body>", standalone.scripts[path]);;
            }
            return fs.readFileSync(wrapperScript).toString('utf8').replace(scriptMappingsPlaceholder, mappings).replace("/*!<SCRIPT-MAIN>!*/", main.replace(".js", "")).replace(apiNamePlaceHolder, apiName);
          },
          saveTo: function(main, path, apiName){
            return fs.writeFileSync(path, standalone.toScript(main, apiName));
          }
        };
    return standalone;
  }
}