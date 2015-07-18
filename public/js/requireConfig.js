'use strict';

define(function(){

    require.config({
        paths: {
            'bogus': '/js/vendor/bogus/bogus',
            'q': '/js/vendor/q/q',
            'pubsub': '/js/vendor/pubsub-js/src/pubsub',
            'hogan': '/js/vendor/requirejs-hogan-plugin/hogan',
            'hgn': '/js/vendor/requirejs-hogan-plugin/hgn',
            'text': '/js/vendor/requirejs-text/text',
            'fetch': '/js/vendor/fetch/fetch',
            'minivents': '/js/lib/minivents'
        },
        shim: {
            'fetch': {
                exports: 'fetch'
            },
            'minivents': {
                exports: 'Events'
            }
        }
    });

});
