'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('PatientAttribute', new Schema({name: String}));
