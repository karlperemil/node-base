var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'movies';
  locals.filters = {
    movie: req.params.slug
  };
  locals.data = {
    movie: [],
    movies: []
  };

  view.on('init', function(next){
    var q = keystone.list('Movie').model.findOne({
      slug: locals.filters.movie
    }).populate('client');

    q.exec(function(err,result){
      locals.data.movie = result;
      next(err);
    });
  });

  view.on('init', function(next){
    var q= keystone.list('Movie').model.find().sort('sortOrder').populate('client').limit(4);
    q.exec(function(err,result){
      locals.data.movies = result;
      console.log(result);
      next(err);
    });
  });

/*
  view.on('init', function(next){
    var q = keystone.list('Movie').model.find({'client':locals.filters.clientid}).sort('-publishedDate').populate('client').limit('4');
    q.exec(function(err,results){
      var duplicate = -1;
      for(var i = 0; i < results.length; i++){
        if(results[i].slug == locals.filters.movie){
          duplicate = i;
        }
      }
      if(duplicate != -1){
        results.splice(duplicate,1)
      }
      locals.data.relatedmovies = results;
      next(err);
    });
  });
*/  // Load the galleries by sortOrder
  /*
  view.query('movie', keystone.list('Movie').model.find().sort('sortOrder').populate('clients'));
  */

  // Render the view
  view.render('movie-single');

};
