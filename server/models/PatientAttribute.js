'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientAttributeSchema = new Schema({}, { strict: false });

if (!PatientAttributeSchema.options.toObject) {
    PatientAttributeSchema.options.toObject = {};
}
PatientAttributeSchema.options.toObject.transform = function transform(doc, ret) {
    delete ret.__v;
    delete ret._id;
    return ret;
};

module.exports = mongoose.model('PatientAttribute', PatientAttributeSchema);
