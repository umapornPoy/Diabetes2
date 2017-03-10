var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    res.render('record');
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/record',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('record', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('record', {
                error: response.body,
                record: [
                {sugarblood: req.body.sugarblood,
                bloodpressure: req.body.bloodpressure,
                cholesterol: req.body.cholesterol,
                weight1: req.body.weight1}
            ]

            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/record');
    });
});

module.exports = router;