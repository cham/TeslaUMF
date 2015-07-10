'use strict';

define([
    'lib/domNode',
    'controllers/listing'
],
function(
    domNode,
    listingController
){

    function AppView(){
        this.el = domNode({
            type: 'div',
            className: 'AppView'
        });
    }

    AppView.prototype.render = function render(){
        this.el.innerHTML = '';

        listingController.load(this.el);
    };

    AppView.prototype.remove = function remove(){
        listingController.unload();
        this.el.remove();
    };

    return AppView;
    
});
