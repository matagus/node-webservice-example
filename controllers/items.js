/*
 * Module dependencies
 */
var Item = require('./libs/db').Item;
    
exports.index = {
  json: function(req, res) {
    Item.all(
      function(item_list) { res.send(item_list, 200); },
      function(err) { return next(err); }
    );
  }
};

exports.create = {
  json: function(req, res, next) {
    Item.create(
      req.body, 
      function(item) { res.send(item, 201); },
      function(err) { return next(err); }
    );
  }
};

exports.show = {
  json: function(req, res) {
    var id = parseInt(req.params.item);
    Item.get(id,
      function(item) {
        if (item) res.send(item);
        else res.send({}, 404);
      },
      function(err) { return next(err); }
    );
  }
};

exports.update = {
  json: function(req, res) {
    var id = parseInt(req.params.item);
    Item.update(
      id, req.body,
      function(item) {
        if (item) res.send(item);
        else res.send({}, 404);
      },
      function(err) { return next(err); }
    );
  }
};

exports.destroy = {
  json: function(req, res) {
    var id = parseInt(req.params.item);
    Item.remove(id,
      function(item) {
        if (item) res.send({}, 200);
        else res.send({}, 404);
      },
      function(err) { return next(err); }
    );
  }
};

exports.default = {
  json: function(req, res) {
    res.send({ error: 'Unsupported format "' + req.format + '"' }, 406);
  }
};
