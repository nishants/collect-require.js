var collector = require("./collector"),
    scripture = require("./scripture");

module.exports = {
  collect: function (baseDir) {
    return scripture.create(collector.collect(baseDir));
  }
};