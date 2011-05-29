/*
 * Usage: 
 * var get_logger = require("logger");
 * var logger = get_logger("MyApp");
 * logger.info("Something happen");
 */

module.exports = function(name) {

    var logger = require("node-syslog").Syslog;

    logger.init("[" + name + "]", logger.LOG_PID | logger.LOG_ODELAY, logger.LOG_INFO);
    
    return {
        info: function(message) { logger.log(logger.LOG_INFO, message); },
        debug: function(message) { logger.log(logger.LOG_DEBUG, message); },
        warning: function(message) { logger.log(logger.LOG_WARN, message); },
        error: function(message) { logger.log(logger.LOG_ERROR, message); }
    }
};
