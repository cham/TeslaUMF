'use strict';
define([
    'controllers/listing'
],
function(
    listing
){

    var sandbox = sinon.sandbox.create();
    var app;

    describe('app', function(){
        var listingLoadStub;

        before(function(done){
            listingLoadStub = sandbox.stub(listing, 'load');
            require(['app'], function(module){
                app = module;
                done();
            });
        });

        it('calls load on the listing controller once', function(){
            expect(listingLoadStub.calledOnce).toEqual(true);
        });

        it('passes the document body node with the load call', function(){
            expect(listingLoadStub.calledWith(document.body)).toEqual(true);
        });
    });

});
