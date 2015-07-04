'use strict';

define([
    'views/AppView'
],
function(
    AppView
){

    var view = new AppView();

    document.body.appendChild(view.el);

    view.render();

});
