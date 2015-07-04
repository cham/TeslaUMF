'use strict';

define(function(){

    return function domNode(options){
        if(!options || !Object.keys(options).length){
            options = {};
        }

        var node = document.createElement(options.type || 'div');
        node.className = options.className || '';
        return node;
    };
    
});
