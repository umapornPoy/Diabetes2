var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,    
                password: req.body.password,
                confirm: req.body.confirm,
                email: req.body.email,
                gender: req.body.gender,
                age: req.body.age,
                weight: req.body.weight,
                height: req.body.height,
                type: req.body.type,
                complication: req.body.complication,
                disease: req.body.disease,
                dragallergy: req.body.dragallergy,
                emaildoctor: req.body.emaildoctor
            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/login');
    });
});

module.exports = router;