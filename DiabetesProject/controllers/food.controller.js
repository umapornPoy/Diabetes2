var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    res.render('food');
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/food',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('food', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('food', {
                error: response.body,
                food: [
                {date: req.body.date,
                item_name: req.body.item_name,
                serving_size_qty: req.body.serving_size_qty,
                calories: req.body.calories,
                sugars: req.body.sugars,
                total_fat: req.body.total_fat,
                cholesterol1: req.body.cholesterol1,
                sodium: req.body.sodium,
                protein: req.body.protein}
            ]

            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/food');
    });
});

module.exports = router;