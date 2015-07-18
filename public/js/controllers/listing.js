'use strict';

define([
    'fetch',
    'views/ListingView'
],
function(
    fetch,
    ListingView
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

    function requiredOptions(options){
        if(!options.el){
            throw new Error('listing controller requires el');
        }
        if(!options.eventBus){
            throw new Error('listing controller requires eventBus');
        }
    }

    return {
        load: function(options){
            requiredOptions(options || {});
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
