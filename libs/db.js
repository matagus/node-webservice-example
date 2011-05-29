/*
* Module dependencies
*/
var mysql = require('mysql-libmysqlclient');

/* Expose contructor and define it later */
module.exports.Database = Database;

function Database(config, logger) {
  this.config = config;
  this.logger = logger;

  this.conn = mysql.createConnectionSync();
  this.conn.connect(
    this.config.database.host, this.config.database.user,
    this.config.database.password, this.config.database.name,
    function(err) { 
        if (err) { 
            logger.error("Error connecting to database: " + err);
            throw err;
        };
        logger.info("Successfully connected to the database!");
    }
  );
};

Database.prototype.save = function() {
  var data = JSON.stringify(this);
  return this;
};

module.exports.Item = Item;

function Item(db) {
  this.db = db
};

Item.prototype.all = function(sucess_callback, error_callback) {
    this.conn.query("SELECT * FROM posts",
      function(err, result) {
        if (err) error_callback(err);
        else result.fetchAll(function (err, rows) {
          if (err) error_callback(err);
          else return rows;
        });
      });
  },

  create: function(params) {
    return { id: 4, title: 'Created Item' }
  },

  get: function(id) {
    var id = parseInt(id);
    var item = item_list.reduce(
      function(a, b) { return (a.id === id) ? a : b }, { id: 0 }
    );
    if (item.id === id) return item;
    return null;
  },

  update: function(id, params) {
    var id = parseInt(id);
    var item = item_list.reduce(
      function(a, b) { return (a.id === id) ? a : b }, { id: 0 }
    );
    if (item.id === id) {
      item['title'] = params.title;
      return item;
    }
    return null;
  },

  remove: function(id, params) {
    var id = parseInt(id);
    item_list = item_list.filter(function(item) { return (item.id !== id)});
    return true;
  }

};

//module.exports.view = function(req, res, next) {

    //req.dbconn.query("SELECT * FROM posts WHERE id=" + req.params.id,
        //function(err, result) {

            //if (err) next(err);

                //result.fetchAll(function (err, rows) {

                    //if (err) next(err);

                    //if (rows.length == 0) next(new NotFound(req.url));

                    //send_response(req, res, 200, req.params.format, rows[0]);
            //});
        //}
    //);

//};


//module.exports.list = function(req, res, next) {

    //switch (req.params.format) {

        //case "json":
            //res.statusCode = 200;
            //res.contentType('application/json');

            //var item_list = [];
            
            //req.dbconn.query("SELECT * FROM posts ORDER BY id ASC",
                //function(err, result) {

                    //if (err) next(err);

                    //result.fetchAll(function (err, rows) {

                        //if (err) next(err);

                        //rows.forEach(function(row) {
                            //item_list.push(row);
                        //});

                        //res.send(JSON.stringify(item_list));
                    //});
                //}
            //);

            //break;

        //default:
            //next();
    //}

//};

//module.exports.create = function(req, res, next) {

    //var body = '';

    //req.on('data', function(chunk) { 
        //body += chunk;
        //req.on('end', function(chunk) {

            //var data = JSON.parse(body);

            /* FIXME: we need:
            *   1) validation. return 400 if one or more params are not valid
            *   2) better string formating and escaping
            */
            //var sql = "INSERT INTO posts values (null, '" + data.title + "', '" + data.summary + "', '" + data.text + "', now(), now())";

            //req.dbconn.query(sql, function(err, result) {
                //// result should contain: { affectedRows: 1, insertId: 3 }
                //if (err) next(err);

                //send_response(req, res, 201, req.params.format, JSON.stringify(data));
            //});
        //});
    //});

//};

//module.exports.update = function(req, res, next) {

    //var body = '';

    //req.on('data', function(chunk) { 
        //body += chunk;
        //req.on('end', function(chunk) {

            //var data = JSON.parse(body);

            /* FIXME: we need:
            *   1) validation. return 400 if one or more params are not valid
            *   2) better string formating and escaping with jade?
            *   var jade = require('jade');
            *     Render a string
            *     jade.render('string of jade', { options: 'here' });
            */
            //var sql = "UPDATE posts set title='" + data.title + "', summary='" + 
                //data.summary + "', body='" + data.text + "', updated_at=now() " +
                //"WHERE id=" + req.params.id;

            //req.dbconn.query(sql, function(err, result) {
                //// result should contain: { affectedRows: 1, insertId: 3 }

                //if (err) next(err);
                
                //if (result.affectedRows == 0) next(new NotFound(req.url));

                //send_response(req, res, 200, req.params.format, JSON.stringify(data));
            //});
        //});
    //});
//};

//module.exports.remove = function(req, res, next) {

    //console.log("REMOVE:", req.params.id, req.body);

    //send_response(req, res, 200, req.params.format, JSON.stringify({id: 1, title: "test"}));
    //// next(new NotFound(req.url));

//};
