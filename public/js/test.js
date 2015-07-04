'use strict';
define(function(){
    mocha.setup('bdd');
    mocha.checkLeaks();
    mocha.globals(['jQuery']);
    
    require(testFiles, function(){
        mocha.run();
    });
});
