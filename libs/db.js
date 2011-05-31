/*
* Module dependencies
*/
var mysql = require('mysql-libmysqlclient'),
  Config = require("./config"),
  get_logger = require("./logger");

var connection = (function() {
  var logger = get_logger("db");
  var config = Config();

  var connection = mysql.createConnectionSync();
  connection.connect(
    config.database.host, config.database.user,
    config.database.password, config.database.name,
    function(err) { 
        if (err) { 
            logger.error("Error connecting to database: " + err);
            throw err;
        };
        logger.info("Successfully connected to the database!");
    }
  );
  return connection;
})();

var ItemManager = function(connection) {
  this.connection = connection;
}

ItemManager.prototype.all = function(sucess_callback, error_callback) {
  this.connection.query("SELECT * FROM posts",
    function(err, result) {
      if (err) error_callback(err);
      else result.fetchAll(function (err, rows) {
        if (err) error_callback(err);
        else return sucess_callback(rows);
      });
    }
  );
};

ItemManager.prototype.create = function(params) {
  return { id: 4, title: 'Created Item' }
};

ItemManager.prototype.get = function(id) {
  var id = parseInt(id);
  var item = item_list.reduce(
    function(a, b) { return (a.id === id) ? a : b }, { id: 0 }
  );
  if (item.id === id) return item;
  return null;
};

ItemManager.prototype.update = function(id, params) {
  var id = parseInt(id);
  var item = item_list.reduce(
    function(a, b) { return (a.id === id) ? a : b }, { id: 0 }
  );
  if (item.id === id) {
    item['title'] = params.title;
    return item;
  }
  return null;
};

ItemManager.prototype.remove = function(id, params) {
  var id = parseInt(id);
  item_list = item_list.filter(function(item) { return (item.id !== id)});
  return true;
};

var Item = {
  objects: new ItemManager(connection)
};

module.exports.Item = Item;
