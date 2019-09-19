var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('roupas');

var service = {};

service.create = create;
service.getAll = getAll;
service.delete = _delete;


module.exports = service;


function create(roupaParam) {
    var deferred = Q.defer();

    createRoupa(roupaParam);

    function createRoupa(roupa) {
        db.roupas.insert(
            roupa,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.roupas.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.roupas.find().toArray(function (err, roupas) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (roupas) {
            deferred.resolve(roupas);
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}
