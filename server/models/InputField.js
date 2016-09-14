'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let InputFieldSchema = new Schema({}, { strict: false });

if (!InputFieldSchema.options.toObject) {
    InputFieldSchema.options.toObject = {};
}
InputFieldSchema.options.toObject.transform = function transform(doc, ret) {
    delete ret.__v;
    delete ret._id;
    return ret;
};

module.exports = mongoose.model('InputField', InputFieldSchema);
