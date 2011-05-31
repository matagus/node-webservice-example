/*
 * Loads a json config file and returns a javascript object
 * with all its keys and values
*/

var path = require("path"),
    fs = require('fs'),
    get_logger = require("./logger");

module.exports = function() {

  var logger = get_logger("config");

  var config;
  logger.info("Reading configuration file...");

  var filepath = path.join(__dirname, "../config.json");
  var configJSON = fs.readFileSync(filepath);

  config = JSON.parse(configJSON.toString());
  logger.info("Configuration file successfully loaded.");

  return config;
};
