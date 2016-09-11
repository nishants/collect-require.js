(function(){
  var script  = "/*!<SCRIPT-PATH>!*/",
      module  = {exports: null},
      require = function (requiredPath) {
        return standalone.run(resolveRequire(script, requiredPath));
      };

  /*!<SCRIPT>!*/

  return module.exports;
})();