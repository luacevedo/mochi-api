'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientAttributeSchema = new Schema({}, { strict: false });

module.exports = mongoose.model('PatientAttribute', PatientAttributeSchema);
