var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Client Model
 * =============
 */

var Client = new keystone.List('Client', {
  autokey: { from: 'name', path: 'slug', unique: true }
});

Client.add({
  name: { type: String, required: true , initial: true}
});

Client.relationship({ ref: 'Movie', path: 'client'})

Client.register();