'use strict';

define([
    'bogus'
],
function(
    bogus
){

    var sandbox = sinon.sandbox.create();
    var ListingView;
    var viewOptions;

    describe('ListingView', function(){
        var domNodeStub;

        before(function(done){
            domNodeStub = sandbox.stub().returns(document.createElement('div'));
            bogus.stub('lib/domNode', domNodeStub);

            bogus.requireWithStubs('views/ListingView', function(module){
                ListingView = module;
                done();
            });
        });

        beforeEach(function(){
            viewOptions = {
                eventBus: {
                    emit: sandbox.stub()
                }
            };
            domNodeStub.reset();
        });

        afterEach(function(){
            sandbox.restore();
        });

        after(bogus.reset);

        describe('definition', function(){
            it('is a function', function(){
                expect(typeof ListingView).toEqual('function');
            });

            it('has a render function', function(){
                expect(typeof ListingView.prototype.render).toEqual('function');
            });

            it('has a remove function', function(){
                expect(typeof ListingView.prototype.remove).toEqual('function');
            });

            describe('required options', function(){
                it('requires an eventBus', function(){
                    expect(function(){
                        delete viewOptions.eventBus;
                        return new ListingView(viewOptions);
                    }).toThrow('ListingView requires eventBus');
                });
            });
        });

        describe('when initialised', function(){
            var view;
            var addEventListenerStub;
            var removeEventListenerStub;

            beforeEach(function(){
                addEventListenerStub = sandbox.stub(HTMLElement.prototype, 'addEventListener');
                removeEventListenerStub = sandbox.stub(HTMLElement.prototype, 'removeEventListener');
                view = new ListingView(viewOptions);
            });

            describe('the el property', function(){
                it('has an el property', function(){
                    expect(view.el).toBeDefined();
                });

                it('calls domNode once', function(){
                    expect(domNodeStub.calledOnce).toEqual(true);
                });

                it('passes options to domNode', function(){
                    expect(typeof domNodeStub.args[0][0]).toEqual('object');
                });

                it('passes a className option of "ListingView" to domNode', function(){
                    expect(domNodeStub.args[0][0].className).toEqual('ListingView');
                });

                it('el is the node returned by domNode', function(){
                    expect(view.el).toEqual(domNodeStub.returnValues[0]);
                });
            });

            describe('the click listener', function(){
                it('has a clickListener property', function(){
                    expect(typeof view.clickListener).toEqual('function');
                });

                it('listens to a single event', function(){
                    expect(addEventListenerStub.calledOnce).toEqual(true);
                });

                it('listens on the view.el', function(){
                    expect(addEventListenerStub.calledOn(view.el)).toEqual(true);
                });

                it('listens for a click event', function(){
                    expect(addEventListenerStub.calledWith('click')).toEqual(true);
                });

                it('binds the clickListener to the click event', function(){
                    expect(addEventListenerStub.args[0][1]).toEqual(view.clickListener);
                });

                describe('when the click listener fires', function(){
                    describe('if the event target has a class name of "thread-urlname"', function(){
                        var emitStub;

                        beforeEach(function(){
                            var node = document.createElement('div');
                            node.className = 'thread-urlname';

                            emitStub = viewOptions.eventBus.emit;

                            view.clickListener({
                                target: node
                            });
                        });

                        it('publishes an event on the view\'s event bus', function(){
                            expect(emitStub.calledOnce).toEqual(true);
                        });

                        it('publishes a "click:thread" event', function(){
                            expect(emitStub.calledWith('click:thread')).toEqual(true);
                        });

                        it('passes the view\'s innerHTML with the event', function(){
                            expect(emitStub.args[0][1]).toEqual(view.el.innerHTML);
                        });
                    });
                });
            });

            describe('remove', function(){
                var removeStub;

                beforeEach(function(){
                    removeStub = sandbox.stub(view.el, 'remove');
                    view.remove();
                });

                it('calls remove on it\'s el node once', function(){
                    expect(removeStub.calledOnce).toEqual(true);
                });

                it('removes a single event listener', function(){
                    expect(removeEventListenerStub.calledOnce).toEqual(true);
                });

                it('removes a click event', function(){
                    expect(removeEventListenerStub.calledWith('click')).toEqual(true);
                });

                it('removes the clickListener from the click event', function(){
                    expect(removeEventListenerStub.args[0][1]).toEqual(view.clickListener);
                });
            });
        });
    });

});
