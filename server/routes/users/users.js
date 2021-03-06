var _ = require('underscore');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
// var bodyParser = require('body-parser'); //parses information from POST
// var methodOverride = require('method-override'); //used to manipulate POST
var UserTest = require('../../models/UserTest');

// router.use(bodyParser.urlencoded({extended: true}))
// router.use(methodOverride(function (req, res) {
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//         var method = req.body._method;
//         delete req.body._method;
//         return method
//     }
// }));

router.route('/')
    .get(function (req, res, next) {
        mongoose.model('UserTest').find(function (err, users) {
            var response = [];

            if (err) return console.error(err);

            _.each(users, function (attribute) {
                var parentCategoryObj = attribute.toObject();

                delete parentCategoryObj._id;
                delete parentCategoryObj.__v;
                response.push(parentCategoryObj);
            });

            res.json(response);
        });
    })
    .post(function (req, res) {
        var attribute = new UserTest(req.body);

        attribute.save(function (err, attribute) {
            if (err) return console.error(err);
            res.json(attribute);
        });
    });

module.exports = router;
