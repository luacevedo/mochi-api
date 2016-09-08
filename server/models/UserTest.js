'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserTestSchema = new Schema({}, { strict: false });

module.exports = mongoose.model('UserTest', UserTestSchema);
