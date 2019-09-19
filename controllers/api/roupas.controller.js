var config = require('config.json');
var express = require('express');
var router = express.Router();
var roupaService = require('services/roupas.service');

// routes
router.post('/', createRoupa);
router.delete('/:_id', deleteRoupa);
router.get('/', getRoupas);


module.exports = router;

function createRoupa(req, res) {
    roupaService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteRoupa(req, res) {

    roupaService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getRoupas(req, res){
    roupaService.getAll()  
        .then(function (roupas) {
            if (roupas) {
                res.send(roupas);
            } else {
                res.sendStatus(404);
            }
        })
    .catch(function (err) {
        res.status(400).send(err);
    });
}