'use strict';

function renderIndex(req, res){
    res.render('index');
}

module.exports = function(router){
    router
        .get('/', renderIndex);
};
