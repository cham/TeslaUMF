'use strict';

define([
    'minivents',
    'controllers/listing'
],
function(
    Minivents,
    listing
){

    var listingEvents = new Minivents();
    listing.load({
        el: document.body,
        eventBus: listingEvents
    });

    listingEvents.on('load:thread', function(threadId){
        listing.unload();
    });

});
