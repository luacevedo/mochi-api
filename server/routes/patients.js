var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST
var PatientAttribute = require('../models/PatientAttribute');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

router.route('/')
    .get(function(req, res, next) {
        mongoose.model('PatientAttribute').find({}, function (err, blobs) {
            if (err) {
                return console.error(err);
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('blobs/index', {
                            title: 'All my Blobs',
                            "blobs" : blobs
                        });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(blobs);
                    }
                });
            }
        });
    })
    //POST a new blob
    .post(function(req, res) {
        //call the create function for our database
        console.log(req.body);
        var attribute = new PatientAttribute({name: "luliii"});

        attribute.save(function (err, attribute) {
            if (err) return console.error(err);
            console.log(attribute.name);
            res.json(attribute);
        });

        // mongoose.model('PatientAttribute').save(req.body, function (err, blob) {
        //     if (err) {
        //         res.send("There was a problem adding the information to the database.");
        //     } else {
        //         //Blob has been created
        //         console.log('POST creating new patient attribute: ' + blob);
        //         res.format({
        //             //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
        //             html: function(){
        //                 // If it worked, set the header so the address bar doesn't still say /adduser
        //                 res.location("blobs");
        //                 // And forward to success page
        //                 res.redirect("/blobs");
        //             },
        //             //JSON response will show the newly created blob
        //             json: function(){
        //                 res.json(blob);
        //             }
        //         });
        //     }
        // })
    });

//
// router.post('/patient/attributes', function(req, res, next) {
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
//
//     // Create a new message model, fill it up and save it to Mongodb
//     let patientAttribute = new PatientAttribute(req.body || {});
//     patientAttribute.save(function () {
//         res.send(req.body);
//     });
//
// });

module.exports = router;
