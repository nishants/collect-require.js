var fs = require("fs"),
    baseDir = "test/data/sample-codebase",
    readFile =  function(path){
      var content = fs.readFileSync(path).toString('utf8');
      return fs.readFileSync("src/adaptor-script.js").toString('utf8').replace("/*!<SCRIPT>!*/", content).replace("/*!<SCRIPT-PATH>!*/", path.replace(baseDir+"/", "").replace(".js", ""));
    };
module.exports = {
  codebasePath : baseDir,
  indexContent : readFile("test/data/sample-codebase/index.js"),
  scriptOneContent: readFile("test/data/sample-codebase/script-one.js"),
  scriptTwoContent: readFile("test/data/sample-codebase/two/script-two.js"),
  scriptThreeContent: readFile("test/data/sample-codebase/three/script-three.js"),
  scriptThreeFiveContent: readFile("test/data/sample-codebase/three/three.five/script-three.five.js"),
  aWritableFilePath : function(){return "test/data/output/script.js";},
  evalScript : function(path){
    return eval(fs.readFileSync(path).toString('utf8'));
  }
}