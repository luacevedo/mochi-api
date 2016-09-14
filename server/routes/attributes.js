var _ = require('underscore');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
// var bodyParser = require('body-parser'); //parses information from POST
// var methodOverride = require('method-override'); //used to manipulate POST
var PatientAttribute = require('../models/PatientAttribute');

// router.use(bodyParser.urlencoded({extended: true}))
// router.use(methodOverride(function (req, res) {
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//         var method = req.body._method;
//         delete req.body._method;
//         return method
//     }
// }));

router.route('/')
    .get(function (req, res) {
        mongoose.model('PatientAttribute').find(function (err, patientAttributes) {
            var response = [];

            if (err) return console.error(err);

            _.each(patientAttributes, function(attribute) {
                response.push(attribute.toObject());
            });

            res.json(response);
        });
    })
    .post(function (req, res) {
        var attribute = new PatientAttribute(req.body);

        attribute.save(function (err, attribute) {
            if (err) return console.error(err);
            res.json(attribute);
        });
    });

module.exports = router;
