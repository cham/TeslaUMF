'use strict';

define([
    'minivents',
    'controllers/listing',
    'controllers/thread'
],
function(
    Minivents,
    listing,
    thread
){

    var listingEvents = new Minivents();
    var threadEvents = new Minivents();

    listing.load({
        el: document.body,
        eventBus: listingEvents
    });

    listingEvents.on('load:thread', function(threadUrlName){
        listing.unload();
        thread.load({
            el: document.body,
            eventBus: threadEvents,
            threadUrlName: threadUrlName
        });
    });

});
