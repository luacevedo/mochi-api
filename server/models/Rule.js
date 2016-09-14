'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RuleSchema = new Schema({}, { strict: false });

if (!RuleSchema.options.toObject) {
    RuleSchema.options.toObject = {};
}
RuleSchema.options.toObject.transform = function transform(doc, ret) {
    delete ret.__v;
    delete ret._id;
    return ret;
};

module.exports = mongoose.model('Rule', RuleSchema);
