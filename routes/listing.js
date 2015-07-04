'use strict';

var listingController = require('../controllers/listing');

module.exports = function(router){
    router
        .get('/', listingController.getIndex);
};
