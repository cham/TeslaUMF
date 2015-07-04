'use strict';

define([
    'lib/domNode'
],
function(
    domNode
){

    function AppView(){
        this.el = domNode({
            type: 'div',
            className: 'AppView'
        });
    }

    AppView.prototype.render = function render(){

    };

    AppView.prototype.remove = function remove(){
        this.el.remove();
    };

    return AppView;
    
});
