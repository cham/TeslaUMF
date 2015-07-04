'use strict';

var recursive = require('recursive-readdir');

function renderIndex(req, res){
    res.render('index');
}

function renderTest(req, res){
    var testDir = __dirname.replace(/\/routes$/, '/public/test');

    recursive(testDir, function (err, files) {
        var tests = files.map(function(filePath){
            return filePath.replace(/.*\/public\/test\//, '');
        });

        res.render('test', {tests: tests});
    });
}

module.exports = function(router){
    router
        .get('/', renderIndex)
        .get('/test', renderTest);
};
