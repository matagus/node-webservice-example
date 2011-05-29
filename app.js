#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express'),
  Resource = require('express-resource'),
  Database = require('./libs/db').Database,
  get_logger = require("./libs/logger"),
  config = require("./libs/config"),
  main = require('./controllers/main');

var app = module.exports = express.createServer();

// configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(
    express.logger(function(req, res, format) {
        var colors = { 404: 33, 500: 31 }, 
            color = colors[res.statusCode] || 32;
        return format(':date \x1b[33m:method\x1b[0m \x1b[' + color +
          'm:url\x1b[0m :status \x1b[34mAccept\: :req[Accept]\x1b[0m - ' +
          '":user-agent" :response-time');
    })
  );
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/static'));

  app.logger = get_logger("ws-server");
  app.config = config(app.logger);

  // available in templates as settings.title
  app.set('title', app.config.title);

  app.db = new Database(app.config, app.logger);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.enable('cache views');
  app.use(express.errorHandler({ dumpExceptions: true }));
});

app.configure(function() {
  // this will be available in all templates as config.test
  app.locals({ config: {test: 'OK!'} });
});

// routing
app.get('/', main.index);
var items = app.resource('items', require('./controllers/items'), { format: 'json' });

// listen
app.listen(app.config.server.port);
console.log("Express server listening on port %d", app.address().port);
