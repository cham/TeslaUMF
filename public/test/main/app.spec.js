'use strict';
define([
    'controllers/listing',
    'controllers/thread',
    'minivents'
],
function(
    listing,
    thread,
    Minivents
){

    var sandbox = sinon.sandbox.create();
    var app;

    describe('app', function(){
        var listingLoadStub;
        var listingUnloadStub;
        var threadLoadStub;
        var onStub;

        before(function(done){
            listingLoadStub = sandbox.stub(listing, 'load');
            listingUnloadStub = sandbox.stub(listing, 'unload');
            threadLoadStub = sandbox.stub(thread, 'load');
            require(['app'], function(module){
                app = module;
                done();
            });
        });

        beforeEach(function(){
            threadLoadStub.reset();
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

        describe('when a load:thread event fires on the listing event bus', function(){
            var eventBus;

            beforeEach(function(){
                eventBus = listingLoadStub.args[0][0].eventBus;
                eventBus.emit('load:thread', 'some-thread');
            });

            it('unloads the listing controller', function(){
                expect(listingUnloadStub.calledOnce).toEqual(true);
            });

            it('calls load on the thread controller', function(){
                expect(threadLoadStub.calledOnce).toEqual(true);
            });

            it('passes options to thread controller load', function(){
                expect(typeof threadLoadStub.args[0][0]).toEqual('object');
            });

            it('passes an el option', function(){
                expect(threadLoadStub.args[0][0].el).toBeDefined();
            });

            it('passes the document body as the value for el', function(){
                expect(threadLoadStub.args[0][0].el).toEqual(document.body);
            });

            it('passes an eventBus option', function(){
                expect(threadLoadStub.args[0][0].eventBus).toBeDefined();
            });

            it('passes a Minivent object as the eventBus', function(){
                expect(threadLoadStub.args[0][0].eventBus instanceof Minivents).toEqual(true);
            });

            it('passes a threadUrlName option', function(){
                expect(threadLoadStub.args[0][0].threadUrlName).toBeDefined();
            });

            it('passes the threadUrlName from the load:thread event for the threadUrlName value', function(){
                expect(threadLoadStub.args[0][0].threadUrlName).toEqual('some-thread');
            });
        });
    });

});
