var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.record = record;
service.delete = _delete;
service.food = food;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        } 
    });

    function updateUser() {
        // fields to update
        var set = {
            firstname: userParam.firstname,
            lastname: userParam.lastname,
            username: userParam.username,
            password: userParam.password,
            confirm: userParam.confirm,
            email: userParam.email,
            gender: userParam.gender,
            age: userParam.age,
            weight:userParam.weight,
            height: userParam.height,
            type: userParam.type,
            complication: userParam.complication,
            disease: userParam.disease,
            dragallergy: userParam.dragallergy,
            emaildoctor: userParam.emaildoctor,
            record: userParam.record

           /* record: [
                {sugarblood: userParam.sugarblood,
                bloodpressure: userParam.bloodpressure,
                cholesterol: userParam.cholesterol,
                weight1: userParam.weight1}
            ] */
        
        };

      /*  function updateUserRecord() {
             record: [
                {sugarblood: userParam.sugarblood,
                bloodpressure: userParam.bloodpressure,
                cholesterol: userParam.cholesterol,
                weight1: userParam.weight1}
            ]

        }*/

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }
 
    return deferred.promise;
}



function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}




function record(_id, userParam) {

    var deferred = Q.defer();

    var recordData = {
        sugarblood: userParam.sugarblood,
        bloodpressure: userParam.bloodpressure,
        cholesterol: userParam.cholesterol,
        weight1: userParam.weight1
    }

    db.users.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $push: { record: recordData } }, function (error) {
            if (error) {
                console.log('Error to save')
                return deferred.reject()
            }

            console.log(`Save Record to ${userParam.username}`)
            return deferred.resolve();
        })


    return deferred.promise;
} 


function food(_id, userParam) {

    var deferred = Q.defer();

    var foodData = {
        item_name: userParam.item_name,
        serving_size_qty: userParam.serving_size_qty,
        calories: userParam.calories,
        sugars: userParam.sugars,
        total_fat: userParam.total_fat,
        cholesterol1: userParam.cholesterol1,
        sodium: userParam.sodium,
        protein: userParam.protein
    }

    db.users.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $push: { food: foodData } }, function (error) {
            if (error) {
                console.log('Error to save')
                return deferred.reject()
            }

            console.log(`Save Food to ${userParam.username}`)
            return deferred.resolve();
        })


    return deferred.promise;
} 