'use strict';

var listingController = require('../controllers/listing');

module.exports = function(router){
    router
        .get('/api/1.0/threads', listingController.getIndex);
};
