'use strict';

define([
    'bogus'
],
function(
    bogus
){

    var sandbox = sinon.sandbox.create();

    describe('thread', function(){
        var ThreadView;
        var viewInstance;
        var threadController;
        var threadEl;
        var threadRemoveStub;
        var threadRenderStub;
        var fetchStub;
        var fetchThenJsonStub;
        var fetchThenRenderStub;
        var fetchCatchStub;
        var responseJson;
        var fakeBus;

        before(function(done){
            threadRemoveStub = sandbox.stub();
            threadRenderStub = sandbox.stub();
            fetchCatchStub = sandbox.stub();
            threadEl = document.createElement('div');

            viewInstance = {
                el: threadEl,
                remove: threadRemoveStub,
                render: threadRenderStub
            };

            ThreadView = sandbox.stub().returns(viewInstance);

            fetchThenRenderStub = sandbox.stub().returns({
                catch: fetchCatchStub
            });
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
                'views/ThreadView': ThreadView,
                'fetch': fetchStub
            });

            bogus.requireWithStubs('controllers/thread', function(module){
                threadController = module;
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
            threadRemoveStub.reset();
            ThreadView.reset();
            sandbox.restore();
        });

        after(bogus.reset);

        describe('definition', function(){
            it('is an object', function(){
                expect(typeof threadController).toEqual('object');
            });

            it('exposes two properties', function(){
                expect(Object.keys(threadController).length).toEqual(2);
            });

            describe('load', function(){
                it('exposes a load function', function(){
                    expect(typeof threadController.load).toEqual('function');
                });

                it('load has an arity of 1', function(){
                    expect(threadController.load.length).toEqual(1);
                });
            });

            describe('unload', function(){
                it('exposes a unload function', function(){
                    expect(typeof threadController.unload).toEqual('function');
                });

                it('unload has an arity of 0', function(){
                    expect(threadController.unload.length).toEqual(0);
                });
            });
        });

        describe('load', function(){
            var domNode;
            var appendStub;

            beforeEach(function(){
                domNode = document.createElement('div');
                appendStub = sandbox.stub(domNode, 'appendChild');
                threadController.load({
                    el: domNode,
                    eventBus: fakeBus,
                    threadUrlName: 'some-thread'
                });
            });

            it('creates a single new ThreadView', function(){
                expect(ThreadView.calledOnce).toEqual(true);
                expect(ThreadView.calledWithNew()).toEqual(true);
            });

            it('passes options to ThreadView', function(){
                expect(typeof ThreadView.args[0][0]).toEqual('object');
            });

            it('passes an eventBus to ThreadView', function(){
                expect(typeof ThreadView.args[0][0].eventBus).toBeDefined();
            });

            it('appends a single node to the dom node passed', function(){
                expect(appendStub.calledOnce).toEqual(true);
            });

            it('appends the ThreadView el to the dom node', function(){
                expect(appendStub.calledWith(threadEl)).toEqual(true);
            });

            it('fetches a single endpoint', function(){
                expect(fetchStub.calledOnce).toEqual(true);
            });

            it('fetches "/api/1.0/thread/:urlname"', function(){
                expect(fetchStub.calledWith('/api/1.0/thread/some-thread')).toEqual(true);
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

                    it('renders the ThreadView once', function(){
                        expect(threadRenderStub.calledOnce).toEqual(true);
                    });

                    it('passes threads from the response json with the render call', function(){
                        expect(threadRenderStub.calledWith(responseJson.threads[0])).toEqual(true);
                    });
                });
            });
        });

        describe('unload', function(){
            beforeEach(function(){
                threadController.load({
                    el: document.createElement('div'),
                    eventBus: fakeBus,
                    threadUrlName: 'whatever'
                });
                threadController.unload();
            });

            it('unsubscribes to a single event', function(){
                expect(fakeBus.off.calledOnce).toEqual(true);
            });

            it('unsubscribes to the "click:thread" event', function(){
                expect(fakeBus.off.calledWith('click:thread')).toEqual(true);
            });

            it('calls remove on the view', function(){
                expect(threadRemoveStub.calledOnce).toEqual(true);
            });
        });
    });

});
