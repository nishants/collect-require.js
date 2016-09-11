var
    main        = "/*!<SCRIPT-MAIN>!*/",
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
    standalone  = {
      /*!<SCRIPT-MAPPINGS>!*/
      run : function (path) {
        return standalone[path]();
      },
    };

SCRIPT_COLLECTOR_API_NAME = standalone[main]();
