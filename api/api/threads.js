'use strict';

var apiRequest = require('../helpers/apiRequest');

function getThreads(){
    return apiRequest({
        method: 'get',
        url: '/threads'
    });
}

exports.getThreads = getThreads;
