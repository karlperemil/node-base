var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'stats';
  locals.filters = {
    project: req.params.slug
  }
  locals.data = {
  }

  view.on('init', function(next){
    var q = keystone.list('Stats').model.findOne({
      slug: locals.filters.project
    }).populate('client');

    q.exec(function(err,result){
      locals.data.stats = result;
      console.log(result);
      next(err);
    });
  });

  // Render the view
  view.render('stats');

};
