'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InputFieldSchema = new Schema({}, { strict: false });

if (!InputFieldSchema.options.toObject) {
    InputFieldSchema.options.toObject = {};
}
InputFieldSchema.options.toObject.transform = function transform(doc, ret) {
    delete ret.__v;
    delete ret._id;
    return ret;
};

module.exports = mongoose.model('InputField', InputFieldSchema);
