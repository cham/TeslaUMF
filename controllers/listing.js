'use strict';

var api = require('../api/api');

function getIndex(req, res){
    api.threads.getThreads()
        .then(function(data){
            res.send(data);
        })
        .catch(function(err){
            res.status(500).send(err);
        });
}

exports.getIndex = getIndex;
