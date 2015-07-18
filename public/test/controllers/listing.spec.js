'use strict';

define([
    'bogus'
],
function(
    bogus
){

    var sandbox = sinon.sandbox.create();

    describe('listing', function(){
        var ListingView;
        var viewInstance;
        var listingController;
        var listingEl;
        var listingRemoveStub;
        var listingRenderStub;
        var fetchStub;
        var fetchThenJsonStub;
        var fetchThenRenderStub;
        var responseJson;
        var fakeBus;

        before(function(done){
            listingRemoveStub = sandbox.stub();
            listingRenderStub = sandbox.stub();
            listingEl = document.createElement('div');

            viewInstance = {
                el: listingEl,
                remove: listingRemoveStub,
                render: listingRenderStub
            };

            ListingView = sandbox.stub().returns(viewInstance);

            fetchThenRenderStub = sandbox.stub();
            fetchThenJsonStub = sandbox.stub().returns({
                then: fetchThenRenderStub
            });
            fetchStub = sandbox.stub().returns({
                then: fetchThenJsonStub
            });


            responseJson = {
                threads: [
                    {
                        _id: 1
                    },
                    {
                        _id: 2
                    },
                    {
                        _id: 3
                    }
                ]
            };

            bogus.stub({
                'views/ListingView': ListingView,
                'fetch': fetchStub
            });

            bogus.requireWithStubs('controllers/listing', function(module){
                listingController = module;
                done();
            });
        });

        beforeEach(function(){
            fakeBus = {
                on: sandbox.stub(),
                off: sandbox.stub(),
                emit: sandbox.stub()
            };
        });

        afterEach(function(){
            fetchStub.reset();
            fetchThenJsonStub.reset();
            fetchThenRenderStub.reset();
            listingRemoveStub.reset();
            ListingView.reset();
            sandbox.restore();
        });

        after(bogus.reset);

        describe('definition', function(){
            it('is an object', function(){
                expect(typeof listingController).toEqual('object');
            });

            it('exposes two properties', function(){
                expect(Object.keys(listingController).length).toEqual(2);
            });

            describe('load', function(){
                it('exposes a load function', function(){
                    expect(typeof listingController.load).toEqual('function');
                });

                it('load has an arity of 1', function(){
                    expect(listingController.load.length).toEqual(1);
                });
            });

            describe('unload', function(){
                it('exposes a unload function', function(){
                    expect(typeof listingController.unload).toEqual('function');
                });

                it('unload has an arity of 0', function(){
                    expect(listingController.unload.length).toEqual(0);
                });
            });
        });

        describe('load', function(){
            var domNode;
            var appendStub;

            beforeEach(function(){
                domNode = document.createElement('div');
                appendStub = sandbox.stub(domNode, 'appendChild');
                listingController.load({
                    el: domNode,
                    eventBus: fakeBus
                });
            });

            it('creates a single new ListingView', function(){
                expect(ListingView.calledOnce).toEqual(true);
                expect(ListingView.calledWithNew()).toEqual(true);
            });

            it('passes options to ListingView', function(){
                expect(typeof ListingView.args[0][0]).toEqual('object');
            });

            it('passes an eventBus to ListingView', function(){
                expect(typeof ListingView.args[0][0].eventBus).toBeDefined();
            });

            it('appends a single node to the dom node passed', function(){
                expect(appendStub.calledOnce).toEqual(true);
            });

            it('appends the ListingView el to the dom node', function(){
                expect(appendStub.calledWith(listingEl)).toEqual(true);
            });

            it('fetches a single endpoint', function(){
                expect(fetchStub.calledOnce).toEqual(true);
            });

            it('fetches "/api/1.0/threads"', function(){
                expect(fetchStub.calledWith('/api/1.0/threads')).toEqual(true);
            });

            describe('when the fetch resolves', function(){
                var fakeResponse;

                beforeEach(function(){
                    fakeResponse = {
                        json: sandbox.stub().returns(responseJson)
                    };

                    fetchThenJsonStub.yield(fakeResponse);
                });

                it('calls response.json() to parse the response', function(){
                    expect(fakeResponse.json.calledOnce).toEqual(true);
                });

                it('returns the result of response.json', function(){
                    expect(fakeResponse.json.returnValues[0]).toEqual(responseJson);
                });

                describe('when the json has been parsed', function(){
                    beforeEach(function(){
                        fetchThenRenderStub.yield(responseJson);
                    });

                    it('renders the ListingView once', function(){
                        expect(listingRenderStub.calledOnce).toEqual(true);
                    });

                    it('passes the response json with the render call', function(){
                        expect(listingRenderStub.calledWith(responseJson)).toEqual(true);
                    });
                });
            });

            it('subscribes to a single event', function(){
                expect(fakeBus.on.calledOnce).toEqual(true);
            });

            it('subscribes to the "click:thread" event', function(){
                expect(fakeBus.on.calledWith('click:thread')).toEqual(true);
            });

            it('binds a function to "click:thread"', function(){
                expect(typeof fakeBus.on.args[0][1]).toEqual('function');
            });

            describe('when click:thread is fired', function(){
                beforeEach(function(){
                    fetchThenRenderStub.yield(responseJson);
                    listingRenderStub.reset();

                    fakeBus.on.yield(3);
                });

                it('emits a single event', function(){
                    expect(fakeBus.emit.calledOnce).toEqual(true);
                });

                it('emits a "load:thread" event', function(){
                    expect(fakeBus.emit.calledWith('load:thread')).toEqual(true);
                });

                it('passes the thread id with the "load:thread" event', function(){
                    expect(fakeBus.emit.calledWith('load:thread', 3)).toEqual(true);
                });
            });
        });

        describe('unload', function(){
            beforeEach(function(){
                listingController.load({
                    el: document.createElement('div'),
                    eventBus: fakeBus
                });
                listingController.unload();
            });

            it('unsubscribes to a single event', function(){
                expect(fakeBus.off.calledOnce).toEqual(true);
            });

            it('unsubscribes to the "click:thread" event', function(){
                expect(fakeBus.off.calledWith('click:thread')).toEqual(true);
            });

            it('calls remove on the view', function(){
                expect(listingRemoveStub.calledOnce).toEqual(true);
            });
        });
    });

});
