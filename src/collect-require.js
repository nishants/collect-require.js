var collector = require("./collector"),
    scripture = require("./scripture");

module.exports = {
  collect: function (baseDir, exclude) {
    return scripture.create(collector.collect(baseDir, exclude));
  }
};