var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Stats Model
 * =============
 */

var Stats = new keystone.List('Stats', {
  map: { name: 'projectName' },
  autokey: { path: 'slug', from: 'projectName', unique: true }
});

Stats.add({
  publishedDate: { type: Date, default: Date.now },
  startDate: {type: Date},
  endDate: {type: Date, default: Date.now},
  projectName: {type: String, required: true, initial: true},
  client: {type: Types.Relationship, ref:'Client',many: false},
  uniques: {type: Number },
  pageviews: {type: Number},
  averagetime: {type: String},
  signups: {type: Number},
  goal: {type: Number},
  conversionrate: {type: Number, default: 0.1},
  traffic: {type: Number},
  deviceMobile: {type: Number },
  deviceComputer: {type: Number },
  deviceTablet: {type: Number},
  sexm: {type: Number},
  sexf: {type: Number},
  returningUsers: {type: Number}
});

Stats.register();
