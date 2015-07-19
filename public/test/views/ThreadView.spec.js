'use strict';

define([
    'bogus'
],
function(
    bogus
){

    var sandbox = sinon.sandbox.create();
    var ThreadView;
    var viewOptions;

    describe('ThreadView', function(){
        var domNodeStub;

        before(function(done){
            domNodeStub = sandbox.stub().returns(document.createElement('div'));
            bogus.stub('lib/domNode', domNodeStub);

            bogus.requireWithStubs('views/ThreadView', function(module){
                ThreadView = module;
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
                expect(typeof ThreadView).toEqual('function');
            });

            it('has a render function', function(){
                expect(typeof ThreadView.prototype.render).toEqual('function');
            });

            it('has a remove ThreadView', function(){
                expect(typeof ThreadView.prototype.remove).toEqual('function');
            });

            describe('required options', function(){
                it('requires an eventBus', function(){
                    expect(function(){
                        delete viewOptions.eventBus;
                        return new ThreadView(viewOptions);
                    }).toThrow('ThreadView requires eventBus');
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
                view = new ThreadView(viewOptions);
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

                it('passes a className option of "ThreadView" to domNode', function(){
                    expect(domNodeStub.args[0][0].className).toEqual('ThreadView');
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
