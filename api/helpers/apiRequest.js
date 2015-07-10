'use strict';

var request = require('request');
var apiRoot = 'http://localhost:3100';

module.exports = function apiRequest(options){
    options.url = apiRoot + options.url;

    return new Promise(function(resolve, reject){
        request(options, function(err, response, data){
            if(err){
                return reject(err);
            }
            resolve(data);
        });
    });
};
