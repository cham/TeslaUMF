'use strict';
define([
    'controllers/listing',
    'minivents'
],
function(
    listing,
    Minivents
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

        it('passes options to listing controller load', function(){
            expect(typeof listingLoadStub.args[0][0]).toEqual('object');
        });

        it('passes an el option', function(){
            expect(listingLoadStub.args[0][0].el).toBeDefined();
        });

        it('passes the document body as the value for el', function(){
            expect(listingLoadStub.args[0][0].el).toEqual(document.body);
        });

        it('passes an eventBus option', function(){
            expect(listingLoadStub.args[0][0].eventBus).toBeDefined();
        });

        it('passes a Minivent object as the eventBus', function(){
            expect(listingLoadStub.args[0][0].eventBus instanceof Minivents).toEqual(true);
        });
    });

});
