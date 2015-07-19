'use strict';

define(function(){

    return function requiredOptions(options, id, required){
        required.forEach(function(key){
            if(!options[key]){
                throw new Error(id + ' requires ' + key);
            }
        });
    };
    
});
