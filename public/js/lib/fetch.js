'use strict';

define([
    'q'
],
function(
    Q
){

    return function fetch(url){
        var deferred = Q.defer();

        var req = new XMLHttpRequest();
        req.responseType = 'json';

        req.onload = function(){
            deferred.resolve(this.response);
        };

        req.open('get', url, true);
        req.send();

        return deferred.promise;
    };

});
