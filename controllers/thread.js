'use strict';

var api = require('../api/api');

function getThread(req, res){
    api.threads.getThread(req.param('urlname'))
        .then(function(data){
            res.send(data);
        })
        .catch(function(err){
            res.status(500).send(err);
        });
}

exports.getThread = getThread;
