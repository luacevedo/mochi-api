'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientAttributeSchema = new Schema({}, { strict: false });

PatientAttributeSchema.statics.findAll = function (id, cb) {
    return this.find({}, cb)
        .then(function(data) {
            var parents = [];

            _.each(function(data, category) {
                var parentCategoryObj = category.toObject();

                parents.push(parentCategoryObj);
            });

            return parents;
        })
};

module.exports = mongoose.model('PatientAttribute', PatientAttributeSchema);
