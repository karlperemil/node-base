var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Movie Model
 * =============
 */

var Movie = new keystone.List('Movie', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

Movie.add({
  publishedDate: { type: Date, default: Date.now },
  heroImage: { type: Types.CloudinaryImage },
  images: { type: Types.CloudinaryImages },
  title: { type: String, required: true , initial: true},
  client: { type: Types.Relationship, ref: 'Client', many: false},
  featured: { type: Boolean, default: false },
  description: { type: Types.Textarea, width: 'medium', required: true, default: 'Beskrivning'},
  vimeoid: { type: String, required: true, default: 'nummret efter vimeo.com t.ex 108194249'},
  year: {type: String, required: true, default: '2014' },
  sound: {type:String,required: false},
});

Movie.register();
