var _ = require('underscore');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
// var bodyParser = require('body-parser'); //parses information from POST
// var methodOverride = require('method-override'); //used to manipulate POST
var InputField = require('../models/InputField');

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
        mongoose.model('InputField').find(function (err, inputFields) {
            var response = [];

            if (err) return console.error(err);

            _.each(inputFields, function(inputField) {
                response.push(inputField.toObject());
            });

            res.json(response);
        });
    })
    .post(function (req, res) {
        var inputField = new InputField(req.body);

        inputField.save(function (err, inputField) {
            if (err) return console.error(err);
            res.json(inputField);
        });
    });

module.exports = router;
