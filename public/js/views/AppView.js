'use strict';

define(function(){

    function AppView(){
        this.el = document.createElement('div');
    }

    AppView.prototype.render = function render(){

    };

    AppView.prototype.remove = function remove(){
        this.el.remove();
    };

    return AppView;
    
});
