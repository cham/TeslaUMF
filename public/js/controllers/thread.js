'use strict';

define([
    'fetch',
    'views/ThreadView',
    'lib/requiredOptions'
],
function(
    fetch,
    ThreadView,
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
            requiredOptions(options || {}, 'thread controller', [
                'el',
                'eventBus',
                'threadUrlName'
            ]);
            unload();

            eventBus = options.eventBus;

            view = new ThreadView({
                eventBus: eventBus
            });

            options.el.appendChild(view.el);

            fetch('/api/1.0/thread/' + options.threadUrlName)
                .then(function(response){
                    return response.json();
                })
                .then(function(threadData){
                    data = threadData.threads[0];
                    view.render(data);
                })
                .catch(function(err){
                    console.log(err);
                });
        },

        unload: unload
    };

});
