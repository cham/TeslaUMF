'use strict';
define(['requireConfig'], function(){
    mocha.setup('bdd');
    mocha.checkLeaks();
    mocha.globals(['jQuery', 'Hogan', 'Events']);

    require(testFiles, function(){
        mocha.run();
    });
});
