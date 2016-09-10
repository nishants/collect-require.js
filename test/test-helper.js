var fs = require("fs"),
    readFile =  function(path){
      return fs.readFileSync(path).toString('utf8');
    };
module.exports = {
  codebasePath : "test/data/sample-codebase",
  indexContent : readFile("test/data/sample-codebase/index.js"),
  scriptOneContent: readFile("test/data/sample-codebase/script-one.js"),
  scriptTwoContent: readFile("test/data/sample-codebase/two/script-two.js"),
  scriptThreeContent: readFile("test/data/sample-codebase/three/script-three.js"),
  scriptThreeFiveContent: readFile("test/data/sample-codebase/three/three.five/script-three.five.js"),
}