'use strict';

define([
    'fetch',
    'views/ListingView',
    'lib/requiredOptions'
],
function(
    fetch,
    ListingView,
    requiredOptions
){

    var data;
    var view;
    var eventBus;

    function unload(){
        data = undefined;
        if(eventBus){
            eventBus.off('click:thread');
            eventBus = undefined;
        }
        if(view){
            view.remove();
            view = undefined;
        }
    }

    return {
        load: function(options){
            requiredOptions(options || {}, 'listing controller', [
                'el',
                'eventBus'
            ]);
            unload();

            eventBus = options.eventBus;

            view = new ListingView({
                eventBus: eventBus
            });

            options.el.appendChild(view.el);

            fetch('/api/1.0/threads')
                .then(function(response){
                    return response.json();
                })
                .then(function(threadData){
                    view.render(threadData);
                    data = threadData;
                });

            eventBus.on('click:thread', function(threadId){
                eventBus.emit('load:thread', threadId);
            });
        },

        unload: unload
    };

});
