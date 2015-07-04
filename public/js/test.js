'use strict';
define(function(){
    require.config({
        paths: {
            'bogus': '/js/vendor/bogus/bogus'
        }
    });

    mocha.setup('bdd');
    mocha.checkLeaks();
    mocha.globals(['jQuery']);

    require(testFiles, function(){
        mocha.run();
    });
});
