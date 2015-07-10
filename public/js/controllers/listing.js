'use strict';

define([
    'pubsub',
    'fetch',
    'views/ListingView'
],
function(
    pubsub,
    fetch,
    ListingView
){

    var data;
    var view;

    function unload(){
        pubsub.unsubscribe('click:thread', selectThread);
        data = undefined;
        if(view){
            view.remove();
            view = undefined;
        }
    }

    function selectThread(eventName, threadId){
        var threads = data.threads;

        view.render({
            threads: threads.filter(function(threadData){
                return threadData._id === threadId;
            })
        });
    }

    return {
        load: function(el){
            unload();

            view = new ListingView({
                eventBus: pubsub
            });

            el.appendChild(view.el);

            fetch('/api/1.0/threads')
                .then(function(response){
                    return response.json();
                })
                .then(function(threadData){
                    view.render(threadData);
                    data = threadData;
                });

            pubsub.subscribe('click:thread', selectThread);
        },

        unload: unload
    };

});
