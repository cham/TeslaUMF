'use strict';

var threadController = require('../controllers/thread');

module.exports = function(router){
    router
        .get('/api/1.0/thread/:urlname', threadController.getThread);
};
