/*
 * Main controllers 
 */

module.exports.index = function(req, res) {
  /* how to access to db, logger and config?
  * req.app.db, req.app.config, req.app.logger
  * req.app.settings
  */

  res.render("index.jade", {
    pageTitle: "Welcome to my WebService!"});
};
