var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST
var PatientAttribute = require('../models/PatientAttribute');

var app = express();

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

router.route('/')
    .get(function(req, res, next) {
        mongoose.model('PatientAttribute').find(function (err, patientAttributes) {
            console.log(patientAttributes);
            if (err) {
                return console.error(err);
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        console.log("htmllll");
                        res.render('blobs/index', {
                            title: 'All my Blobs',
                            "blobs" : patientAttributes
                        });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        console.log("jsoooon");
                        res.json(patientAttributes);
                    }
                });
            }
        });
    })
    //POST a new blob
    .post(function(req, res) {
        var attribute = new PatientAttribute(req.body);

        attribute.save(function (err, attribute) {
            if (err) return console.error(err);
            console.log(attribute.name);
            res.json(attribute);
        });

    });

module.exports = router;
