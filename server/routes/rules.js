var _ = require('underscore');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
// var bodyParser = require('body-parser'); //parses information from POST
// var methodOverride = require('method-override'); //used to manipulate POST
var Rule = require('../models/Rule');

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
        mongoose.model('Rule').find(function (err, rules) {
            var response = [];

            if (err) return console.error(err);

            _.each(rules, function (rule) {
                response.push(rule.toObject());
            });

            res.json(response);
        });
    })
    .post(function (req, res) {
        var rule = new Rule(req.body);

        rule.save(function (err, rule) {
            if (err) return console.error(err);
            res.json(rule);
        });
    });


module.exports = router;
