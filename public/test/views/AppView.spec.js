'use strict';

define([
    'bogus',
    'controllers/listing'
],
function(
    bogus,
    listingController
){

    var sandbox = sinon.sandbox.create();
    var AppView;

    describe('AppView', function(){
        var domNodeStub;

        before(function(done){
            domNodeStub = sandbox.stub().returns(document.createElement('div'));
            bogus.stub('lib/domNode', domNodeStub);

            bogus.requireWithStubs('views/AppView', function(module){
                AppView = module;
                done();
            });
        });

        beforeEach(function(){
            sandbox.stub(listingController, 'load');
            sandbox.stub(listingController, 'unload');
            domNodeStub.reset();
        });

        afterEach(function(){
            sandbox.restore();
        });

        after(bogus.reset);

        describe('definition', function(){
            it('is a function', function(){
                expect(typeof AppView).toEqual('function');
            });

            it('has a render function', function(){
                expect(typeof AppView.prototype.render).toEqual('function');
            });

            it('has a remove function', function(){
                expect(typeof AppView.prototype.remove).toEqual('function');
            });
        });

        describe('when initialised', function(){
            var view;

            beforeEach(function(){
                view = new AppView();
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

                it('passes a type option of "div" to domNode', function(){
                    expect(domNodeStub.args[0][0].type).toEqual('div');
                });

                it('passes a className option of "AppView" to domNode', function(){
                    expect(domNodeStub.args[0][0].className).toEqual('AppView');
                });

                it('el is the node returned by domNode', function(){
                    expect(view.el).toEqual(domNodeStub.returnValues[0]);
                });
            });

            describe('render', function(){
                beforeEach(function(){
                    view.render();
                });

                it('empties the el', function(){
                    view.el.appendChild(document.createElement('div'));
                    view.render();
                    expect(view.el.children.length).toEqual(0);
                });

                it('calls load on the listing controller', function(){
                    expect(listingController.load.calledOnce).toEqual(true);
                });

                it('passes the view el to the load call', function(){
                    expect(listingController.load.calledWith(view.el)).toEqual(true);
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

                it('calls unload on the listing controller', function(){
                    expect(listingController.unload.calledOnce).toEqual(true);
                });
            });
        });
    });

});
