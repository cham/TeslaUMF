'use strict';

var apiRequest = require('../helpers/apiRequest');

function getThreads(){
    return apiRequest({
        method: 'get',
        url: '/threads'
    });
}

function getThread(urlName){
    return apiRequest({
        method: 'get',
        url: '/thread/' + urlName + '/complete'
    });
}

exports.getThreads = getThreads;
exports.getThread = getThread;
