var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'movies';

  // Load the galleries by sortOrder
  view.query('movie', keystone.list('Movie').model
    .find()
    .sort('sortOrder')
    .populate('client')
  );

  // Render the view
  view.render('movies');

};
